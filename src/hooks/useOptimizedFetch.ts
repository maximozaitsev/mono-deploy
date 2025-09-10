"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseOptimizedFetchOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number;
  retryDelay?: number;
}

interface UseOptimizedFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; staleTime: number }>();

export function useOptimizedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: UseOptimizedFetchOptions = {}
): UseOptimizedFetchResult<T> {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 30 * 60 * 1000, // 30 minutes
    retry = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    // Check cache first
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.staleTime) {
      setData(cached.data);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      
      // Cache the result
      cache.set(key, {
        data: result,
        timestamp: Date.now(),
        staleTime,
      });

      setData(result);
      retryCountRef.current = 0;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled
      }

      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData();
        }, retryDelay * retryCountRef.current);
      } else {
        setError(err as Error);
        retryCountRef.current = 0;
      }
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, enabled, staleTime, retry, retryDelay]);

  const refetch = useCallback(() => {
    cache.delete(key);
    fetchData();
  }, [key, fetchData]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Clean up old cache entries
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      const entries = Array.from(cache.entries());
      entries.forEach(([cacheKey, value]) => {
        if (now - value.timestamp > cacheTime) {
          cache.delete(cacheKey);
        }
      });
    };

    const interval = setInterval(cleanup, 5 * 60 * 1000); // Clean every 5 minutes
    return () => clearInterval(interval);
  }, [cacheTime]);

  return { data, loading, error, refetch };
}

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { HomePageProps } from "@/types/offer";

interface OffersContextType {
  data: HomePageProps | null;
  loading: boolean;
  error: string | null;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

interface OffersProviderProps {
  children: ReactNode;
  initialData: HomePageProps;
}

export function OffersProvider({ children, initialData }: OffersProviderProps) {
  const [data, setData] = React.useState<HomePageProps | null>(initialData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  return (
    <OffersContext.Provider value={{ data, loading, error }}>
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error("useOffers must be used within an OffersProvider");
  }
  return context;
}

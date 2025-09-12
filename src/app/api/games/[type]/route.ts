import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { type: string } }
) {
  const { type } = params;
  const upstream = `https://api.adkey-seo.com/api/website/get-games/${encodeURIComponent(
    type
  )}`;
  const res = await fetch(upstream, { cache: "no-store" });
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Cache aggressively at the edge; SWR for freshness
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}



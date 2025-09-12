import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  const { siteId } = params;
  if (!siteId) {
    return new Response(JSON.stringify({ website: {}, offers: [] }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstreamUrl = `https://api.adkey-seo.com/api/website/get-website/${siteId}`;

  const res = await fetch(upstreamUrl, {
    method: "GET",
    // Upstream may not compress; Vercel/Next will compress this response to client
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
    cache: "no-store",
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Longer cache improves repeat-visit speed
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}



import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing image URL", { status: 400 });
  }

  try {
    // Fetch the image from the external API
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch image", { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/webp";

    // Return the image with proper cache headers
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Cache for 1 year (images don't change often)
        "Cache-Control": "public, max-age=31536000, immutable",
        // Add ETag for better caching
        "ETag": `"${Buffer.from(imageBuffer).toString('base64').slice(0, 16)}"`,
        // CORS headers
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

import sharp from "sharp";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

function badRequest(msg: string) {
  return new NextResponse(msg, { status: 400 });
}

const ALLOWED_HOSTS = new Set(["api.adkey-seo.com"]);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");
    const w = Number(searchParams.get("w") || "0");
    const h = Number(searchParams.get("h") || "0");
    const format = (searchParams.get("f") || "webp").toLowerCase();
    const q = Math.max(1, Math.min(100, Number(searchParams.get("q") || "82")));
    const fitParam = (searchParams.get("fit") || "contain").toLowerCase();

    if (!src) return badRequest("Missing src");
    if (!w || !h) return badRequest("Missing or invalid w/h");

    let input: Buffer;
    
    // Check if it's a local file path
    if (src.startsWith("/") && !src.startsWith("//")) {
      try {
        const filePath = path.join(process.cwd(), "public", src);
        input = await fs.readFile(filePath);
      } catch {
        return badRequest("Local file not found");
      }
    } else {
      // Remote URL
      let srcUrl: URL;
      try {
        srcUrl = new URL(src);
      } catch {
        return badRequest("Invalid src URL");
      }
      if (!ALLOWED_HOSTS.has(srcUrl.hostname)) {
        return new NextResponse("Forbidden host", { status: 403 });
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(srcUrl, { signal: controller.signal, cache: "no-store" });
      clearTimeout(timeout);
      if (!res.ok) {
        return new NextResponse(`Upstream error ${res.status}`, { status: 502 });
      }
      const arrayBuffer = await res.arrayBuffer();
      input = Buffer.from(arrayBuffer);
    }

    const fitAllowed = new Set(["cover", "contain", "fill", "inside", "outside"]);
    const fit = (fitAllowed.has(fitParam) ? fitParam : "contain") as keyof sharp.FitEnum;

    let resizeOpts: sharp.ResizeOptions = {
      width: w,
      height: h,
      fit,
      position: "centre",
      withoutEnlargement: true,
    };
    if (fit === "contain") {
      resizeOpts.background = { r: 0, g: 0, b: 0, alpha: 0 };
    }

    let pipeline = sharp(input).resize(resizeOpts);

    let contentType = "image/webp";
    switch (format) {
      case "webp":
        pipeline = pipeline.webp({ quality: q });
        contentType = "image/webp";
        break;
      case "png":
        pipeline = pipeline.png({ quality: q as any });
        contentType = "image/png";
        break;
      case "jpeg":
      case "jpg":
        pipeline = pipeline.jpeg({ quality: q });
        contentType = "image/jpeg";
        break;
      default:
        pipeline = pipeline.webp({ quality: q });
        contentType = "image/webp";
    }

    const buf = await pipeline.toBuffer();
    const blob = new Blob([new Uint8Array(buf)], { type: contentType });
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: any) {
    const msg = e?.name === "AbortError" ? "Timeout" : "Internal error";
    return new NextResponse(msg, { status: 500 });
  }
}



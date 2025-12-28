"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set up the worker - use local node_modules version
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

interface PdfRendererProps {
  url: string;
  width?: number;
  className?: string;
}

export default function PdfRenderer({
  url,
  width,
  className,
}: PdfRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;

        setPdfDoc(pdf);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
        setLoading(false);
      }
    };

    if (url) {
      loadPdf();
    }
  }, [url]);

  useEffect(() => {
    let renderTask: pdfjsLib.RenderTask | null = null;

    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(1);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        const viewport = page.getViewport({ scale: 1.5 });

        // Set canvas dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "RenderingCancelledException"
        ) {
          // Ignore cancellation errors
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to render page");
      }
    };

    renderPage();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading PDF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          className="border shadow-lg"
          style={{ maxWidth: width ? `${width}px` : "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

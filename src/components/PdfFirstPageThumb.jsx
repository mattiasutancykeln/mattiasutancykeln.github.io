/**
 * Renders the first page of a PDF as a thumbnail in a 16:9 box.
 * Used on lecture cards when pdfFile is set. Requires pdfjs-dist worker (initPdfWorker).
 */
import { useEffect, useRef, useState } from 'react';
import { getDocument } from 'pdfjs-dist';
import { initPdfWorker } from '../lib/pdfWorker';

export default function PdfFirstPageThumb({ pdfUrl, alt = 'PDF' }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl || !canvasRef.current) return;

    initPdfWorker();
    let cancelled = false;

    const load = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const scale = (canvas.offsetWidth / viewport.width) * dpr;
        const scaledViewport = page.getViewport({ scale });
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        if (cancelled) return;
        const renderTask = page.render({
          canvasContext: ctx,
          viewport: scaledViewport,
        });
        await renderTask.promise;
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load PDF');
      }
    };

    load();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="pdf-thumb pdf-thumb--error" aria-label={alt}>
        <PdfIcon />
        <span className="pdf-thumb__fallback">PDF</span>
      </div>
    );
  }

  return (
    <div className="pdf-thumb" aria-label={alt}>
      <canvas ref={canvasRef} className="pdf-thumb__canvas" />
    </div>
  );
}

/** Simple PDF icon SVG for fallback or when no PDF URL */
export function PdfIcon() {
  return (
    <svg
      className="pdf-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 13h4" />
      <path d="M14 17h2" />
    </svg>
  );
}

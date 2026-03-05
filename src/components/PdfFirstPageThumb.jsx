/**
 * Renders the first page of a PDF as a thumbnail.
 * Used on lecture cards when pdfFile is set. Requires pdfjs-dist worker (initPdfWorker).
 * pdfUrl should be absolute (e.g. from PostCard) so loading works with any base path.
 * Fallback: if preview fails, use ImageMagick to pre-render: magick "file.pdf[0]" page1.png
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
    let page = null;
    let ro = null;

    const render = async (container) => {
      const w = container.offsetWidth;
      if (w <= 0 || !page) return;
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      const viewport = page.getViewport({ scale: 1 });
      const dpr = window.devicePixelRatio || 1;
      const scale = w / viewport.width;
      const scaledHeight = viewport.height * scale;
      const renderViewport = page.getViewport({ scale: scale * dpr });
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(scaledHeight * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${scaledHeight}px`;
      canvas.style.maxWidth = '100%';
      if (cancelled) return;
      const ctx = canvas.getContext('2d');
      const renderTask = page.render({
        canvasContext: ctx,
        viewport: renderViewport,
      });
      await renderTask.promise;
    };

    (async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!container || cancelled) return;
        ro = new ResizeObserver(() => {
          if (!cancelled && page) render(container);
        });
        ro.observe(container);
        await render(container);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load PDF');
      }
    })();

    return () => {
      cancelled = true;
      if (ro) ro.disconnect();
    };
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

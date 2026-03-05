/**
 * Renders all pages of a PDF in a scrollable column. Uses pdfjs-dist (initPdfWorker).
 */
import { useEffect, useRef, useState } from 'react';
import { getDocument } from 'pdfjs-dist';
import { initPdfWorker } from '../lib/pdfWorker';

const SCALE = 1.5;
const GAP = 16;

export default function PdfPagesViewer({ pdfUrl }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!pdfUrl || !containerRef.current) return;
    setReady(false);
    initPdfWorker();
    let cancelled = false;

    const load = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        const n = pdf.numPages;
        const container = containerRef.current;
        if (!container || cancelled) return;
        container.replaceChildren();
        const dpr = window.devicePixelRatio || 1;
        for (let i = 1; i <= n; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: SCALE * dpr });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${viewport.width / dpr}px`;
          canvas.style.height = `${viewport.height / dpr}px`;
          canvas.style.display = 'block';
          canvas.style.marginBottom = i < n ? `${GAP}px` : '0';
          const ctx = canvas.getContext('2d');
          const renderTask = page.render({
            canvasContext: ctx,
            viewport,
          });
          await renderTask.promise;
          container.appendChild(canvas);
        }
        if (!cancelled) setReady(true);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load PDF');
      }
    };

    load();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="pdf-pages-viewer pdf-pages-viewer--error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pdf-pages-viewer">
      {!ready && <p className="pdf-pages-viewer__loading">Loading…</p>}
      <div className="pdf-pages-viewer__pages" ref={containerRef} />
    </div>
  );
}

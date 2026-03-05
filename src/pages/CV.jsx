/**
 * CV page — full-height PDF viewer + download (PROJECT.md §3.5)
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PdfPagesViewer from '../components/PdfPagesViewer';

const BASE = import.meta.env.BASE_URL;

export default function CV() {
  const [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    setPdfUrl(new URL(`${BASE}cv.pdf`, window.location.origin).href);
  }, []);

  return (
    <article>
      <p className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>← home</Link>
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <h1 className="font-display" style={{ margin: 0 }}>CV</h1>
        <a
          href={`${BASE}cv.pdf`}
          download
          className="cv-download"
        >
          Download CV ↓
        </a>
      </div>
      <div className="cv-viewer">
        {pdfUrl ? <PdfPagesViewer pdfUrl={pdfUrl} /> : <p className="pdf-pages-viewer__loading">Loading…</p>}
      </div>
    </article>
  );
}

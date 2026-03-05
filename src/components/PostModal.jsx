/**
 * Full-screen overlay for a research/lecture post (PROJECT.md §3.3 PostModal).
 * Left: summary, tags, links. Right: PDF viewer or enlarged figure. Close button, ESC, backdrop click.
 */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PdfPagesViewer from './PdfPagesViewer';

const BASE = import.meta.env.BASE_URL;

function absoluteUrl(path) {
  if (typeof window === 'undefined') return path;
  return new URL(path, window.location.origin).href;
}

export default function PostModal({ post, variant = 'research', onClose }) {
  const isLecture = variant === 'lecture';
  const contentBase = isLecture ? 'content/lecture' : 'content/research';
  const figureSrc = !isLecture && post?.figure
    ? `${BASE}${contentBase}/${post.slug}/${post.figure}`
    : null;
  const pdfPath = post?.pdfFile
    ? `${BASE}${contentBase}/${post.slug}/${post.pdfFile}`
    : null;
  const pdfUrl = pdfPath ? absoluteUrl(pdfPath) : null;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!post) return null;

  return (
    <motion.div
      className="post-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="post-modal__backdrop" aria-hidden />
      <div className="post-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="post-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="post-modal__left">
          <p className="post-modal__meta font-mono">
            {post.institution} · {post.date}
          </p>
          <h2 className="post-modal__title font-display">{post.title}</h2>
          {post.tags?.length ? (
            <p className="post-modal__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-modal__tag">{tag}</span>
              ))}
            </p>
          ) : null}
          <p className="post-modal__summary">{post.summary}</p>
          <div className="post-modal__links">
            {post.externalLink && (
              <a
                href={post.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="post-modal__link"
              >
                ↗ Paper
              </a>
            )}
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="post-modal__link"
              >
                ⬇ PDF
              </a>
            )}
          </div>
        </div>

        <div className="post-modal__right">
          {pdfUrl ? (
            <PdfPagesViewer pdfUrl={pdfUrl} />
          ) : figureSrc ? (
            <img
              src={figureSrc}
              alt=""
              className="post-modal__figure"
            />
          ) : (
            <p className="post-modal__no-preview">No preview</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

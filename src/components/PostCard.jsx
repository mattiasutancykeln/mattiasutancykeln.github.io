/**
 * Card for research and lecture entries (PROJECT.md §3.3, §3.4).
 * Click on card opens the modal (when onMoreClick is provided). Links (↗ Paper, ⬇ PDF, View PDF) open in new tab.
 */
import { motion } from 'framer-motion';
import PdfFirstPageThumb, { PdfIcon } from './PdfFirstPageThumb';

const BASE = import.meta.env.BASE_URL;

function absoluteUrl(path) {
  if (typeof window === 'undefined') return path;
  return new URL(path, window.location.origin).href;
}

export default function PostCard({ post, variant = 'research', onMoreClick }) {
  const isLecture = variant === 'lecture';
  const accentVar = isLecture ? '--accent-sage' : '--accent-teal';

  const contentBase = isLecture ? 'content/lecture' : 'content/research';
  const figureSrc = !isLecture && post.figure
    ? `${BASE}${contentBase}/${post.slug}/${post.figure}`
    : null;
  const pdfPath = post.pdfFile
    ? `${BASE}${contentBase}/${post.slug}/${post.pdfFile}`
    : null;
  const pdfUrl = pdfPath ? absoluteUrl(pdfPath) : null;

  const primaryUrl = isLecture
    ? pdfUrl
    : (post.externalLink || pdfUrl || null);

  const isClickable = !!onMoreClick || !!primaryUrl;

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (onMoreClick) {
      onMoreClick(post);
      return;
    }
    if (primaryUrl) {
      e.preventDefault();
      window.open(primaryUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (onMoreClick) onMoreClick(post);
    else if (primaryUrl) window.open(primaryUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      className="post-card"
      data-variant={variant}
      style={{
        '--card-accent': `var(${accentVar})`,
        cursor: isClickable ? 'pointer' : undefined,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ transition: { duration: 0.15 } }}
      onClick={handleCardClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {/* Figure / PDF area */}
      <div className="post-card__figure-wrap">
        {isLecture ? (
          pdfPath ? (
            <PdfFirstPageThumb pdfUrl={pdfUrl} alt={post.title} />
          ) : (
            <div className="post-card__pdf-placeholder" aria-label="PDF">
              <PdfIcon />
            </div>
          )
        ) : (
          figureSrc && (
            <div
              className="post-card__figure"
              style={{ backgroundImage: `url(${figureSrc})` }}
              role="img"
              aria-hidden
            />
          )
        )}
        {!isLecture && post.status && (
          <span className="post-card__status">{post.status}</span>
        )}
      </div>

      <div className="post-card__body">
        <p className="post-card__meta font-mono">
          {post.institution} · {post.date}
          {post.tags?.length ? (
            <>
              {' '}
              {post.tags.map((tag) => (
                <span key={tag} className="post-card__tag">
                  {tag}
                </span>
              ))}
            </>
          ) : null}
        </p>
        <h2 className="post-card__title font-display">{post.title}</h2>
        <p className="post-card__summary">{post.summary}</p>

        {!isLecture && (post.externalLink || post.pdfFile) && (
          <div className="post-card__links">
            {post.externalLink && (
              <a
                href={post.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card__link"
                onClick={(e) => e.stopPropagation()}
              >
                ↗ Paper
              </a>
            )}
            {post.pdfFile && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card__link"
                onClick={(e) => e.stopPropagation()}
              >
                ⬇ PDF
              </a>
            )}
          </div>
        )}

        {isLecture && pdfUrl && (
          <div className="post-card__links">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="post-card__link"
              onClick={(e) => e.stopPropagation()}
            >
              View PDF
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

/**
 * Card for research and lecture entries (PROJECT.md §3.3, §3.4).
 * Research: figure, institution, title, summary, tags, status, [↗ Paper] [⬇ PDF] [→ More].
 * Lecture: no figure image, no links; PDF icon or first-page PDF preview in 16:9 area. Accent: sage.
 */
import { motion } from 'framer-motion';
import PdfFirstPageThumb, { PdfIcon } from './PdfFirstPageThumb';

const BASE = import.meta.env.BASE_URL;

export default function PostCard({ post, variant = 'research', onMoreClick }) {
  const isLecture = variant === 'lecture';
  const accentVar = isLecture ? '--accent-sage' : '--accent-teal';

  const contentBase = isLecture ? 'content/lectures' : 'content/research';
  const figureSrc = !isLecture && post.figure
    ? `${BASE}${contentBase}/${post.slug}/${post.figure}`
    : null;
  const pdfUrl = post.pdfFile
    ? `${BASE}${contentBase}/${post.slug}/${post.pdfFile}`
    : null;

  return (
    <motion.article
      className="post-card"
      data-variant={variant}
      style={{ '--card-accent': `var(${accentVar})` }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ transition: { duration: 0.15 } }}
    >
      {/* Figure / PDF area — 16:9 */}
      <div className="post-card__figure-wrap">
        {isLecture ? (
          pdfUrl ? (
            <PdfFirstPageThumb pdfUrl={pdfUrl} alt={post.title} />
          ) : (
            <div className="post-card__pdf-placeholder" aria-label="PDF">
              <PdfIcon />
            </div>
          )
        ) : (
          figureSrc && (
            <img
              src={figureSrc}
              alt=""
              className="post-card__figure"
              loading="lazy"
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

        {!isLecture && (
          <div className="post-card__links">
            {post.externalLink && (
              <a
                href={post.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card__link"
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
              >
                ⬇ PDF
              </a>
            )}
            {onMoreClick && (
              <button
                type="button"
                className="post-card__link post-card__link--btn"
                onClick={() => onMoreClick(post)}
              >
                → More
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

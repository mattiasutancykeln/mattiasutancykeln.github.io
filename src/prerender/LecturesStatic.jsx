/**
 * SSR-safe lectures listing (no pdfjs). Used only for static prerender.
 */
import { Link } from 'react-router-dom';
import { lecturePosts } from '../content/lectures.js';

const BASE = import.meta.env.BASE_URL;

export default function LecturesStatic() {
  return (
    <article>
      <p className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>← home</Link>
      </p>
      <h1 className="font-display" style={{ marginBottom: '1.5rem' }}>Lectures</h1>
      <ul className="posts-grid prerender-cards" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {lecturePosts.map((post) => (
          <li
            key={post.slug}
            className="prerender-card"
            style={{
              padding: '1.25rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 4,
            }}
          >
            <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.35rem' }}>
              {post.institution} · {post.date}
            </p>
            <h2 className="font-display" style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', fontWeight: 600 }}>
              {post.title}
            </h2>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.6 }}>{post.summary}</p>
            {post.audience ? (
              <p className="font-mono" style={{ fontSize: '0.8rem', margin: '0 0 0.5rem', color: 'var(--text-muted)' }}>
                Audience: {post.audience}
              </p>
            ) : null}
            <p className="font-mono" style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-muted)' }}>
              {post.tags.join(' · ')}
            </p>
            {post.pdfFile ? (
              <p style={{ margin: '0.75rem 0 0' }}>
                <a href={`${BASE}content/lecture/${post.slug}/${post.pdfFile}`}>
                  PDF / materials
                </a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

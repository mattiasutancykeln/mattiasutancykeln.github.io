/**
 * Lectures page — grid of PostCards (PROJECT.md §3.4). No links/figures; PDF icon or first-page preview.
 */
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { lecturePosts } from '../content/lectures';

export default function Lectures() {
  return (
    <article style={{ padding: '2rem 0' }}>
      <p className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>← home</Link>
      </p>
      <h1 className="font-display" style={{ marginBottom: '1.5rem' }}>Lectures</h1>
      <div className="posts-grid">
        {lecturePosts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            variant="lecture"
          />
        ))}
      </div>
    </article>
  );
}

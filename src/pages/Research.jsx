/**
 * Research page — grid of PostCards (PROJECT.md §3.3)
 */
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { researchPosts } from '../content/research';

export default function Research() {
  return (
    <article style={{ padding: '2rem 0' }}>
      <p className="font-mono" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>← home</Link>
      </p>
      <h1 className="font-display" style={{ marginBottom: '1.5rem' }}>Research</h1>
      <div className="posts-grid">
        {researchPosts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            variant="research"
            onMoreClick={null}
          />
        ))}
      </div>
    </article>
  );
}

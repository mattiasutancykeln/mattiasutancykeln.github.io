/**
 * Research page — grid of PostCards (PROJECT.md §3.3), PostModal on "→ More"
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import { researchPosts } from '../content/research';

export default function Research() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <article>
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
            onMoreClick={setSelectedPost}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedPost && (
          <PostModal
            post={selectedPost}
            variant="research"
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
}

/**
 * Lectures page — grid of PostCards (PROJECT.md §3.4). Click card opens PostModal.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import { lecturePosts } from '../content/lectures';

export default function Lectures() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <article>
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
            onMoreClick={setSelectedPost}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedPost && (
          <PostModal
            post={selectedPost}
            variant="lecture"
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
}

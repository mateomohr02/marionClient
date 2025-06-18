"use client";

import Loading from "@/components/Loading";
import useGetPosts from "@/hooks/useGetPosts";
import PostCard from "@/components/PostCard";
import { motion } from 'framer-motion';


const Page = () => {
  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetPosts(page, limit);

  return (
    <motion.div className="min-h-[calc(100vh-8rem)]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {loading && <Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && (
        <p>No hay publicaciones disponibles.</p>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
};

export default Page;

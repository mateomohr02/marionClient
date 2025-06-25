"use client";

import Loading from "@/components/Loading";
import useGetPosts from "@/hooks/useGetPosts";
import PostCard from "@/components/PostCard";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import Error from "@/components/Error";

const Page = () => {
  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetPosts(page, limit);

  const t = useTranslations("Blog");

  return (
    <motion.div className="min-h-[calc(100vh-8rem)]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {loading && <Loading/>}
      {error && <p className="text-red-500"><Error msj={t("Page.Error")}/></p>}
      {!loading && posts.length === 0 && (
        <Error msj={t("Page.NoPosts")}/>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
};

export default Page;

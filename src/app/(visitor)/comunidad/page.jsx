'use client';

import useGetPosts from "../../../../hooks/useGetPosts";
import PostCard from "../../components/PostCard";

const Page = () => {
  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetPosts(page, limit);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog de la comunidad</h1>

      {loading && <p>Cargando publicaciones...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && <p>No hay publicaciones disponibles.</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;

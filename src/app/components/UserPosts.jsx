import { useSelector } from "react-redux";

const UserPosts = () => {
  const { userActivity } = useSelector((state) => state.admin);

  if (!userActivity?.id) return null;

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Publicaciones de {userActivity.name}
      </h2>

      {userActivity.Posts?.length > 0 ? (
        <div className="space-y-4">
          {userActivity.Posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded p-4 bg-gray-50"
            >
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <div className="space-y-2">
                {post.content.map((block, i) => {
                  if (block.contentType === "text") {
                    return (
                      <p key={i} className="text-sm text-gray-800 whitespace-pre-line">
                        {block.value}
                      </p>
                    );
                  }
                  if (block.contentType === "image") {
                    return (
                      <img
                        key={i}
                        src={block.value}
                        alt="Imagen"
                        className="w-full max-w-md rounded"
                      />
                    );
                  }
                  return null;
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Curso ID: {post.courseId} | Fecha: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500">Este usuario no tiene publicaciones.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Respuestas</h2>

      {userActivity.Replies?.length > 0 ? (
        <div className="space-y-4">
          {userActivity.Replies.map((reply) => (
            <div
              key={reply.id}
              className="border border-blue-300 rounded p-4 bg-blue-50"
            >
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {reply.content}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Publicación ID: {reply.postId} | Fecha: {new Date(reply.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500">Este usuario no tiene respuestas.</p>
      )}
    </div>
  );
};

export default UserPosts;

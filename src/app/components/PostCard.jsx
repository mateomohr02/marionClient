const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content}</p>

      {post.imageUrls?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-2">
          {post.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagen ${index + 1}`}
              className="w-32 h-32 object-cover rounded"
            />
          ))}
        </div>
      )}

      {post.videoUrl?.length !== 0 ? (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={post.videoUrl}
            title="Video"
            frameBorder="0"
            allowFullScreen
            className="w-full h-64"
          ></iframe>
        </div>
      ): ""}
    </div>
  );
};

export default PostCard;

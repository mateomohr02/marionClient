import CommentCard from "./CommentCard";

const CommentSection = ({ data, postId }) => {
  // Clonar los comentarios para evitar modificar los originales
  const commentMap = {};
  const clonedData = data.map(comment => ({ ...comment, replies: [] }));

  // Construir mapa de comentarios
  clonedData.forEach(comment => {
    commentMap[comment.id] = comment;
  });

  // Llenar el árbol de comentarios
  const rootComments = [];
  clonedData.forEach(comment => {
    if (comment.parentId === null) {
      rootComments.push(comment);
    } else {
      const parent = commentMap[comment.parentId];
      if (parent) {
        parent.replies.push(comment);
      }
    }
  });

  return (
    <div>
      {rootComments.map(comment => (
        <CommentCard key={comment.id} data={comment} postId={postId} level={0} />
      ))}
    </div>
  );
};

export default CommentSection;

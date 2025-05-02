import CommentCard from "./CommentCard";

const CommentSection = ({ data, postId}) => {
  // Construir un mapa de comentarios por ID
  const commentMap = {};
  data.forEach(comment => {
    comment.replies = [];
    commentMap[comment.id] = comment;
  });

  // Llenar el árbol de comentarios
  const rootComments = [];
  data.forEach(comment => {
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


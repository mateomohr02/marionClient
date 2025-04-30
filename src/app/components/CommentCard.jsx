const CommentCard = ({ data }) => {
  return (
    <div className="my-4">
      <p className="font-poppins">Nombre del usuario</p>
      <div className="mt-2 pl-4">
        <p className="font-poppins">{data.content}</p>
        <button className="font-poppins my-1 hover:bg-snow px-2 py-1 rounded-full">Responder</button>
      </div>
    </div>
  );
};

export default CommentCard;

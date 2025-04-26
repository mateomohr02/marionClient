const PostDetail = ({ data }) => {
    console.log(data, 'Data');
  
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-black">{data?.title}</h2>
        <div className="space-y-4">
          {data?.content?.map((cont, index) => {
            if (cont.contentType === "text") {
              return <p key={index} className="text-base text-gray-800">{cont.value}</p>;
            } else if (cont.contentType === "image") {
              return (
                <img
                  key={index}
                  src={cont.value}
                  alt={`Imagen-${index}`}
                  className="w-full rounded-md"
                />
              );
            } else if (cont.contentType === "video") {
              return (
                <div key={index} className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={cont.value.replace("watch?v=", "embed/").split("&")[0]}
                    title={`Video-${index}`}
                    allowFullScreen
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="text-red-500">
                  Error al obtener el contenido de la publicación
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };
  
  export default PostDetail;
  

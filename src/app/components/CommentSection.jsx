import CommentCard from "./CommentCard"

const CommentSection = ({data}) => {

  return (
    <div>

      {
        data.map((comment)=>{

          return <CommentCard key={comment.id} data={comment}/>
          
        })
      }
    </div>
  )
}

export default CommentSection
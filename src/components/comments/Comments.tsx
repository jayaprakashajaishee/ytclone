import * as React from "react";
import useFetchData from "../../hooks/useFetch";
import comments from "../../comments.json";
import { Stack, Card } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";
import CommentCard from "./CommentCard";

const Comments: React.FC<{ videoId: string }> = ({ videoId }) => {
  console.log({ videoId });
  return (
    <Stack gap={2}>
      {comments.items.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default Comments;

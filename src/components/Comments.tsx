import * as React from "react";
import useFetchData from "../hooks/useFetch";
import comments from "../comments.json";
import { Stack, Card } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";

const Comments: React.FC = () => {
  console.log({ comments });
  return (
    <Stack gap={2}>
      {comments.items.map((comment) => (
        <Card className="dark" key={comment.id}>
          <Card.Body>
            <div style={{ display: "flex", height: 20 }}>
              <p style={{ fontSize: 13, fontWeight: "bold" }}>
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </p>
              <p style={{ fontSize: 13, color: "var(--grey)" }}>
                .{"        "}
                {formatDistanceToNow(
                  new Date(comment.snippet.topLevelComment.snippet.publishedAt),
                  { addSuffix: true }
                )}
              </p>
            </div>
            <p style={{ fontSize: 14 }}>
              {comment.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div style={{ display: "flex" }}>
              <LiaThumbsUp size={25} />
              <p style={{ fontSize: 12, color: "var(--grey)" }}>
                {comment.snippet.topLevelComment.snippet.likeCount}
              </p>
              <LiaThumbsDown size={25} />
            </div>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default Comments;

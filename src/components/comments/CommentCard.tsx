import React, { useState } from "react";
import { Card, Stack, Image } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";
import { CommentItem, ReplyCommentItem } from "../../types/types";
import { Button } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";

const CommentCard: React.FC<{
  comment?: CommentItem;
  reply?: ReplyCommentItem;
}> = ({ comment, reply }) => {
  const [showComments, setshowComments] = useState<boolean>(false);
  const publishedDate: string | undefined =
    comment?.snippet.topLevelComment.snippet.publishedAt ||
    reply?.snippet.publishedAt;

  return (
    <Card className="dark" key={comment?.id || reply?.id}>
      <div style={{ display: "flex" }}>
        <div>
          <Image
            style={{ marginTop: 20, height: comment ? 45 : 30 }}
            roundedCircle
            src={
              comment?.snippet.topLevelComment.snippet.authorProfileImageUrl ||
              reply?.snippet.authorProfileImageUrl
            }
          />
        </div>
        <Card.Body>
          <div style={{ display: "flex", height: 20 }}>
            <p style={{ fontSize: 13, fontWeight: "bold" }}>
              {comment?.snippet.topLevelComment.snippet.authorDisplayName ||
                reply?.snippet.authorDisplayName}
            </p>
            <p style={{ fontSize: 13, color: "var(--grey)" }}>
              .{"        "}
              {publishedDate &&
                formatDistanceToNow(new Date(publishedDate), {
                  addSuffix: true,
                })}
            </p>
          </div>
          <p style={{ fontSize: 14 }}>
            {comment?.snippet.topLevelComment.snippet.textDisplay ||
              reply?.snippet.textDisplay}
          </p>
          <div style={{ display: "flex" }}>
            <LiaThumbsUp size={25} />
            <p style={{ fontSize: 12, color: "var(--grey)" }}>
              {comment?.snippet.topLevelComment.snippet.likeCount ||
                reply?.snippet.likeCount}
            </p>
            <LiaThumbsDown size={25} />
          </div>
          {!!comment?.snippet.totalReplyCount && (
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setshowComments((prev) => !prev)}
            >
              <IoMdArrowDropdown />
              {comment.snippet.totalReplyCount} replies
            </Button>
          )}
          {showComments && comment?.replies && (
            <div style={{ marginLeft: 30, marginTop: 20 }}>
              <Stack>
                {comment.replies.comments.map((comment) => (
                  <CommentCard key={comment.id} reply={comment} />
                ))}
              </Stack>
            </div>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

export default CommentCard;

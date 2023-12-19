import * as React from "react";
import { Card } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
const VideoCard: React.FC<Video> = (props) => {
  return (
    <Link to={`/video/${props.id}`} style={{ textDecoration: "none" }}>
      <Card
        className="dark"
        style={{ maxWidth: props.thumbnails.medium?.width, margin: "auto" }}
      >
        <Card.Img
          variant="top"
          style={{
            maxWidth: props.thumbnails.medium?.width,
            maxHeight: props.thumbnails.medium?.height,
            borderRadius: 15,
          }}
          src={props.thumbnails.medium?.url}
        />
        <Card.Body>
          <Card.Title style={{ fontWeight: "bolder" }}>
            {props.title}
          </Card.Title>
          <Card.Text style={{ color: "var(--grey)", fontSize: 15 }}>
            {props.channelTitle}
            <br />
            {new Intl.NumberFormat("en-US", {
              maximumFractionDigits: 1,
              notation: "compact",
            }).format(Number(props.viewCount))}{" "}
            views.{" "}
            {formatDistanceToNow(new Date(props.publishedAt), {
              addSuffix: true,
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

interface Video {
  title: string;
  channelTitle: string;
  thumbnails: { [key: string]: ThumbNail | undefined };
  viewCount: string;
  publishedAt: string;
  id: string;
}

interface ThumbNail {
  height: number;
  width: number;
  url: string;
}

export default VideoCard;

import * as React from "react";
import { Card } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";

const VideoCard: React.FC<Video> = (props) => {
  return (
    <Card className="dark" style={{ maxWidth: props.thumbnails.high.width }}>
      <Card.Img
        variant="top"
        style={{
          maxWidth: props.thumbnails.high.width,
          maxHeight: props.thumbnails.high.height,
          borderRadius: 15,
        }}
        src={props.thumbnails.medium.url}
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: "bolder" }}>{props.title}</Card.Title>
        <Card.Text>
          <p style={{ color: "var(--grey)", fontSize: 15 }}>
            {props.channelTitle}
            <br />
            {new Intl.NumberFormat("en-US", {
              maximumFractionDigits: 1,
              notation: "compact",
            }).format(Number(props.viewCount))}{" "}
            views .{" "}
            {formatDistanceToNow(new Date(props.publishedAt), {
              addSuffix: true,
            })}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

interface Video {
  title: string;
  channelTitle: string;
  thumbnails: { [key: string]: ThumbNail };
  viewCount: string;
  publishedAt: string;
}

interface ThumbNail {
  height: number;
  width: number;
  url: string;
}

export default VideoCard;

import * as React from "react";
import videos from "../videos.json";
import { Container, Row, Col } from "react-bootstrap";
import VideoCard from "./VideoCard";

const VideoGrid: React.FC = () => {
  console.log({ videos });
  return (
    <Container fluid>
      <Row xs={1} sm={1} md={3} lg={4}>
        {videos.items.map((vid, i) => (
          <Col key={i}>
            <VideoCard
              title={vid.snippet.title}
              channelTitle={vid.snippet.channelTitle}
              thumbnails={vid.snippet.thumbnails}
              viewCount={vid.statistics.viewCount}
              publishedAt={vid.snippet.publishedAt}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VideoGrid;

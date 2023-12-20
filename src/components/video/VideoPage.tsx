import * as React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Comments from "../comments/Comments";

const VideoPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <iframe
            title={id}
            style={{ width: "100%", aspectRatio: "16/9", borderRadius: 15 }}
            src={`//www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <Comments videoId={id!} />
        </Col>
        <Col md={4}>
          {/* <iframe
            title={id}
            style={{ width: "100%", aspectRatio: "16/9" }}
            src={`//www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default VideoPage;

import React from "react";
import { Card, Col } from "react-bootstrap";

const VideoCardPlaceHolder: React.FC = () => {
  return (
    <Card className="dark" style={{ maxWidth: 320, margin: "auto" }}>
      <div
        style={{
          backgroundColor: "#3F3F3F",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 15,
        }}
      />
      <Card.Body>
        <div
          style={{
            backgroundColor: "#3F3F3F",
            width: "100%",
            height: 20,
            marginTop: 4,
          }}
        />
        <div
          style={{
            backgroundColor: "#3F3F3F",
            width: "60%",
            height: 20,
            marginTop: 4,
          }}
        />
      </Card.Body>
    </Card>
  );
};

const VideoCardPlaceHolders: React.FC<{ count: number }> = ({ count }) => {
  const placeHolders = [];
  for (let i = 0; i <= count; i++) {
    placeHolders.push(
      <Col key={i}>
        <VideoCardPlaceHolder />
      </Col>
    );
  }

  return <>{placeHolders}</>;
};

export default VideoCardPlaceHolders;

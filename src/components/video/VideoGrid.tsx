import React, { useCallback, useEffect, useState } from "react";
import videos from "../../videos.json";
import { Container, Row, Col } from "react-bootstrap";
import useFetchData from "../../hooks/useFetch";
import VideoCard from "./VideoCard";
import VideoCardPlaceHolders from "./VideoCardPlaceHolder";
import axios from "axios";
import { VideoData } from "../../types/types";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${process.env.REACT_APP_BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&regionCode=IN&key=${process.env.REACT_APP_KEY}&maxResults=20`,
  headers: {},
};

const VideoGrid: React.FC = () => {
  const [
    videoData,
    videosLoading,
    videoError,
    setVideoData,
    setVideoDataLoading,
    setVideoDataError,
  ] = useFetchData(config);

  const loadMore = useCallback(() => {
    setVideoDataLoading(true);
    const newConfig = {
      ...config,
      url: config.url + `&pageToken=${videoData.nextPageToken}`,
    };

    axios
      .request(newConfig)
      .then((response) => {
        setVideoData((prev: VideoData) => ({
          ...prev,
          nextPageToken: response.data.nextPageToken,
          prevPageToken: response.data.prevPageToken,
          items: [...prev.items, ...response.data.items],
        }));
        setVideoDataLoading(false);
      })
      .catch((error) => {
        setVideoDataError(error);
        setVideoDataLoading(false);
      });
  }, [setVideoData, setVideoDataError, setVideoDataLoading, videoData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      videosLoading
    ) {
      return;
    }
    loadMore();
  }, [videosLoading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Container fluid>
      <Row xs={1} md={4} lg={4} xl={5}>
        {videoData &&
          videoData.items.map((vid: any, i: number) => (
            <Col key={vid.id}>
              <VideoCard
                id={vid.id}
                title={vid.snippet.title}
                channelTitle={vid.snippet.channelTitle}
                thumbnails={vid.snippet.thumbnails}
                viewCount={vid.statistics.viewCount}
                publishedAt={vid.snippet.publishedAt}
              />
            </Col>
          ))}
        {videosLoading && <VideoCardPlaceHolders count={15} />}
        {videoError && <div>Error</div>}
        {/* {videos.items.map((vid: any, i: number) => (
          <Col key={vid.id}>
            <VideoCard
              title={vid.snippet.title}
              channelTitle={vid.snippet.channelTitle}
              thumbnails={vid.snippet.thumbnails}
              viewCount={vid.statistics.viewCount}
              publishedAt={vid.snippet.publishedAt}
              id={vid.id}
            />
          </Col>
        ))} */}
      </Row>
    </Container>
  );
};

export default VideoGrid;

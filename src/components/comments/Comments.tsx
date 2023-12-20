import React, { useMemo, useCallback, useEffect } from "react";
import useFetchData from "../../hooks/useFetch";
import comments from "../../comments.json";
import { Stack, Spinner } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";
import CommentCard from "./CommentCard";
import { CommentItem, RootComment } from "../../types/types";
import axios from "axios";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://youtube.googleapis.com/youtube/v3/commentThreads?part=id%2Creplies%2Csnippet&maxResults=10&key=AIzaSyCUGnNnrteD_IGHlgPyhWtIWxugvDQHQtE&order=relevance",
  headers: {},
};

const Comments: React.FC<{ videoId: string }> = ({ videoId }) => {
  const _config = useMemo(
    () => ({ ...config, url: config.url + `&videoId=${videoId}` }),
    [videoId]
  );

  const [
    comments,
    loadingComments,
    errorComments,
    setComments,
    setCommentsLoading,
    setCommentsError,
  ] = useFetchData(_config);

  const loadMore = useCallback(() => {
    setCommentsLoading(true);
    console.log(comments.nextPageToken);
    const newConfig = {
      ...config,
      url:
        config.url +
        `&videoId=${videoId}` +
        `&pageToken=${comments.nextPageToken}`,
    };

    axios
      .request(newConfig)
      .then((response) => {
        setComments((prev: RootComment) => ({
          ...prev,
          nextPageToken: response.data.nextPageToken,
          prevPageToken: response.data.prevPageToken,
          items: [...prev.items, ...response.data.items],
        }));
        setCommentsLoading(false);
      })
      .catch((error) => {
        setCommentsError(error);
        setCommentsLoading(false);
      });
  }, [setComments, setCommentsError, setCommentsLoading, comments, videoId]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loadingComments
    ) {
      return;
    }
    loadMore();
  }, [loadingComments, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, comments]);

  return (
    <Stack gap={2}>
      {comments?.items.map((comment: CommentItem) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {loadingComments && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" />
        </div>
      )}
    </Stack>
  );
};

export default Comments;

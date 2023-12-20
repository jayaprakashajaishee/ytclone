export interface VideoData {
  etag: string;
  items: any[];
  kind: string;
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
}

export interface RootComment {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: CommentItem[];
}

export interface CommentItem {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentSnippet2;
  replies?: Replies;
}

interface Replies {
  comments: ReplyCommentItem[];
}

export interface ReplyCommentItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet3;
}

interface Snippet3 {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  parentId: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
}

interface CommentSnippet2 {
  channelId: string;
  videoId: string;
  topLevelComment: TopLevelComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}

interface TopLevelComment {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentSnippet;
}

interface CommentSnippet {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
}

interface AuthorChannelId {
  value: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

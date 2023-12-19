export interface VideoData {
  etag: string;
  items: any[];
  kind: string;
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
}

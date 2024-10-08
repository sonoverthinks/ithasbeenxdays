export interface Timeline {
  timeline: Tweet[];
}

export interface Tweet {
  tweet_id: string;
  bookmarks: number;
  created_at: string;
  favorites: number;
  text: string;
  lang: string;
  views: string | null;
  quotes: number;
  entities: Entities;
  replies: number;
  retweets: number;
  conversation_id: string;
  media: Media[];
  author: Author;
  quoted?: Quoted;
  retweeted?: Retweeted;
  retweeted_tweet?: RetweetedTweet;
}

interface Entities {
  hashtags: unknown[];
  symbols: unknown[];
  timestamps: unknown[];
  urls: unknown[];
  user_mentions: UserMention[];
}

interface Media {
  photo?: Photo[];
  video?: Video[];
}

interface Photo {
  media_url_https: string;
  id: string;
  sizes: Sizes;
}

interface Video {
  media_url_https: string;
  variants: Variant[];
  aspect_ratio: number[];
  original_info: OriginalInfo;
  id: string;
}

interface Variant {
  content_type: string;
  url: string;
  bitrate?: number;
}

interface Sizes {
  h: number;
  w: number;
  resize: string;
}

interface OriginalInfo {
  height: number;
  width: number;
  focus_rects: unknown[];
}

interface Author {
  rest_id: string;
  name: string;
  screen_name: string;
  avatar: string;
  blue_verified: boolean;
}

interface Quoted {
  tweet_id: string;
  bookmarks: number;
  created_at: string;
  favorites: number;
  text: string;
  lang: string;
  views: string;
  quotes: number;
  replies: number;
  retweets: number;
  conversation_id: string;
  author: Author;
  media: Media;
}

interface Retweeted {
  id: string;
}

interface UserMention {
  id_str: string;
  name: string;
  screen_name: string;
  indices: number[];
}

interface RetweetedTweet {
  tweet_id: string;
  bookmarks: number;
  created_at: string;
  favorites: number;
  text: string;
  lang: string;
  views: string;
  quotes: number;
  entities: object;
  replies: number;
  retweets: number;
  conversation_id: string;
  author: Author;
  media: Media[];
}

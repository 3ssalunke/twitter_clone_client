export interface IMedia {
  key: string;
  url: string;
}

export interface IUser {
  name: string;
  user_id: string;
  profile_color: string;
  description: string;
  follower: string[];
  following: string[];
  follower_count: number;
  following_count: number;
}

export interface ITweet {
  tweet_id: number;
  user_id: string;
  video: IMedia | null;
  image: IMedia[] | [];
  contents: string;
  create_date: string;
  retweet: string[];
  retweet_count: number;
  like: string[];
  like_count: number;
  comments: string[];
  comments_count?: number;
  is_retweet?: boolean;
  register_date?: string;
  is_active: boolean;
  user: IUser;
}

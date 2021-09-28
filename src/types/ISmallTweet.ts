import IMedia from './IMedia';

interface IUser {
  name: string;
  user_id: string;
  photo: IMedia;
  description: string;
  follower: number;
  following: number;
}

export default interface ISmallTweet {
  user_id: string;
  writer_id: string;
  tweet_id: number;
  video: IMedia | null;
  image: IMedia[] | [];
  contents: string;
  create_date: string;
  retweet: string[];
  retweet_count: number;
  like: string[];
  like_count: number;
  comments: string[];
  comments_count: number;
  is_retweet: boolean;
  register_date: string;
  user: IUser;
}

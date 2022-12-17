export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface IPost {
  id: string;
  post_message: string;
  post_picture: string;
  profile_picture: string;
  timestamp: Timestamp;
  username: string;
  user_id: string;
}

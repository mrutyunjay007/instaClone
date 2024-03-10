export interface IConnection {
  userName: string;
  userId: string;
  profilePic: string;
  isFollower: boolean;
  isFollowing: boolean;
}

export type TConnection = (IConnection | null)[];
// const initialState = new Array<IConnection>();

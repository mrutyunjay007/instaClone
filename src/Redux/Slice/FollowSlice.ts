export interface IConnection {
  userName: string;
  userId: string;
  profilePic: string;
  isFollower: boolean;
  isFollowing: boolean;
}

export type TConnection = IConnection[];
// const initialState = new Array<IConnection>();

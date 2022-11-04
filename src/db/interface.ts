export type VoteData = {
  dishId: number;
  point: number;
};
export interface IAddVoteProps {
  username: string;
  voteData: VoteData[];
}
export interface IGetUserVote {
  username: string;
}

export interface IUserLoginProps {
  username: string;
  password: string;
}

export interface IUserAuthResult {
  username: string;
  authenticated: boolean;
}

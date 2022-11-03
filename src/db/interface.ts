export type VoteData = {
    dishId: number;
    point: number;
}
export interface IAddVoteProps {
    email: string;
    voteData: VoteData[]
}
export interface IGetUserVote {
    email: string;
}
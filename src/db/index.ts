import { IAddVoteProps, IGetUserVote, VoteData } from "./interface";

export const addVoteHandler = ({ email, voteData }: IAddVoteProps) => {
    localStorage.setItem(email, JSON.stringify(voteData))
}

export const getUserVoteHandler = ({ email }: IGetUserVote): VoteData[] => {
    const result = localStorage.getItem(email);
    if (result === null) return [];
    return JSON.parse(result) as VoteData[]
}

export const getAllVoteDataHandler = (): VoteData[][] => {
    const allValues: VoteData[][] = []
    const keys = Object.keys(localStorage)

    keys.forEach(key => {
        const val = localStorage.getItem(key)
        allValues.push(JSON.parse(val!))
    })
    return allValues;
}
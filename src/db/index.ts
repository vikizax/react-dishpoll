import { IAddVoteProps, IGetUserVote, VoteData } from "./interface";

export const addVoteHandler = ({ username, voteData }: IAddVoteProps) => {
  localStorage.setItem("user_" + username, JSON.stringify(voteData));
};

export const getUserVoteHandler = ({ username }: IGetUserVote): VoteData[] => {
  const result = localStorage.getItem("user_" + username);
  if (result === null) return [];
  return JSON.parse(result) as VoteData[];
};

export const getAllVoteDataHandler = (): VoteData[][] => {
  const allValues: VoteData[][] = [];
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.includes("user_")) {
      const val = localStorage.getItem(key);
      allValues.push(JSON.parse(val!));
    }
  });
  return allValues;
};

export {
  getLoggedInAuthHandler,
  logoutHandler,
  userLoginHandler,
} from "./user";

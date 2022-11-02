import { Dispatch, SetStateAction } from "react";
import { DishDataType, DishType } from "../../../../data";

export interface IPollVoteProps {
    voteData: DishDataType;
    setSelectedDish: Dispatch<SetStateAction<DishType>>;
}
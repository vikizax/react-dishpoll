import { Dispatch, SetStateAction } from "react";
import { DishDataType, DishType } from "../../../data";

export interface IDishPollActionProps {
    voteData: DishDataType;
    selectedDish: DishType;
    setSelectedDish: Dispatch<SetStateAction<DishType>>;
}
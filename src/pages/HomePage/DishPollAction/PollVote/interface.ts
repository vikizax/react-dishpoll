import { Dispatch, SetStateAction } from "react";
import { DishDataType, DishType } from "../../../../data";
import { AlertColor } from "@mui/material";
export interface IPollVoteProps {
    voteData: DishDataType;
    setSelectedDish: Dispatch<SetStateAction<DishType>>;
}

export interface ISnackData {
    open: boolean;
    message: string;
    severity: AlertColor
}
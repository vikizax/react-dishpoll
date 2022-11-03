import { Dispatch, SetStateAction } from "react";
import { AlertColor } from "@mui/material";
import {  DishType } from "../../../data";
import { DishRankType } from "../LeaderboardList/interface";

export interface IUserSubmissionRankProps {
    voteData: DishRankType[];
    setSelectedDish: Dispatch<SetStateAction<DishType>>;
}

export interface ISnackData {
    open: boolean;
    message: string;
    severity: AlertColor
}
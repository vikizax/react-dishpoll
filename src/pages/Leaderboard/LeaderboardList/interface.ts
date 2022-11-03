import { Dispatch, SetStateAction } from 'react';
import { DishDataType, DishType, } from '../../../data';
import { IDishIdToDishType } from '../interface';

interface ILeaderboardProps {
    dishRankList: DishRankType[]
    setSelectedDish: Dispatch<SetStateAction<DishType>>
    isLoading: boolean
}

export type DishRankType = DishType & { points: number, rank?: number }

export interface IDishIdToRankType {
    [key: string]: DishRankType
}


export type { ILeaderboardProps }

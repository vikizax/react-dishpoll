import { Dispatch, SetStateAction } from 'react';
import { DishDataType, DishType } from '../../../data';

interface IDishPollListProps {
    dishListData: DishDataType
    setSelectedDish: Dispatch<SetStateAction<DishType>>
    isLoading: boolean
}

export type { IDishPollListProps }

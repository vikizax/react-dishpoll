import DishData from './db.json';
import UserData from './user.json';

export type DishType = {
    id: number,
    dishName: string,
    description: string,
    image: string
}
export type UserType = {
    id: number,
    username: string,
    password: string
}
export type DishDataType = DishType[];
export type UserDataType = UserType[];
export { DishData, UserData }

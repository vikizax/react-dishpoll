import { Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { DishDataType, DishType } from "../../data";
import { IDishIdToDishType } from "./interface";
import LeaderboardList from "./LeaderboardList";
import { getAllVoteDataHandler, getUserVoteHandler } from "../../db";
import { DishRankType, IDishIdToRankType } from "./LeaderboardList/interface";
import DishDescription from "../../components/DishDescription";
import UserSubmissionRank from "./UserSubmissionRank";
import Page from "../../components/Page";
import { AuthContext } from "../../context";

const Leaderboard = () => {
  const {
    auth: { username },
  } = useContext(AuthContext);

  const [selectedDish, setSelectedDish] = useState<DishType>({
    description: "",
    dishName: "",
    id: -1,
    image: "",
  });
  const [dishData, setDishData] = useState<DishRankType[]>([]);
  const [userDishRank, setUserDishRank] = useState<DishRankType[]>([]);

  const handleDishRanking = (dishData: IDishIdToDishType) => {
    const copyDishListData = structuredClone(dishData) as IDishIdToDishType;
    const voteData = getAllVoteDataHandler();
    const dishIdToRankAggrigationData: IDishIdToRankType = {};

    for (let i = 0; i < voteData.length; i++) {
      const voteParent = voteData[i];
      for (let j = 0; j < voteParent.length; j++) {
        const { dishId, point } = voteParent[j];
        if (dishIdToRankAggrigationData[`${dishId}`] === undefined) {
          dishIdToRankAggrigationData[`${dishId}`] = {
            ...dishData[`${dishId}`],
            points: point,
          };
        } else {
          dishIdToRankAggrigationData[`${dishId}`].points += point;
        }
      }
    }
    const sortedData = Object.values(dishIdToRankAggrigationData).sort(
      (a, b) => b.points - a.points
    ) as DishRankType[];

    sortedData.forEach(({ id }) => delete copyDishListData[`${id}`]);

    Object.entries(copyDishListData).forEach(([key, dish]) => {
      sortedData.push({ ...dish, points: 0 });
    });

    const userVoteData = getUserVoteHandler({ username });
    const votedIds = userVoteData.map(({ dishId }) => dishId);
    const userDishRank: DishRankType[] = [];

    sortedData.forEach((dish, idx) => {
      if (votedIds.includes(dish.id)) {
        userDishRank.push({ ...dish, rank: idx + 1 });
      }
    });

    setDishData(sortedData);
    setUserDishRank(userDishRank);
  };

  const { isLoading } = useQuery({
    queryKey: ["dish-data-leaderboard"],
    queryFn: () =>
      fetch(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      ).then((res) => res.json() as Promise<DishDataType>),
    onSuccess: (data) => {
      const mappedData: IDishIdToDishType = {};
      data.forEach((dish) => {
        mappedData[dish.id] = dish;
      });
      handleDishRanking(mappedData);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Page title="React Dish Poll: Leaderboard">
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <LeaderboardList
            dishRankList={dishData}
            isLoading={isLoading}
            setSelectedDish={setSelectedDish}
          />
        </Grid>

        <Grid item xs={6}>
          <Stack gap={2}>
            <UserSubmissionRank
              setSelectedDish={setSelectedDish}
              voteData={userDishRank}
            />
            <DishDescription dish={selectedDish} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Leaderboard;

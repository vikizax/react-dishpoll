import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "@mui/material";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import DishPollList from "./DishPollList";
import DishPollAction from "./DishPollAction";
import { DishDataType, DishType } from "../../data";
import Page from "../../components/Page";

const HomePage = () => {
  const [dishData, setDishData] = useState<DishDataType>([]);
  const [voteData, setVoteData] = useState<DishDataType>(Array(3).fill({}));
  const [selectedDish, setSelectedDish] = useState<DishType>({
    description: "",
    dishName: "",
    id: -1,
    image: "",
  });

  const { isLoading } = useQuery({
    queryKey: ["dish-data"],
    queryFn: () =>
      fetch(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      ).then((res) => res.json() as Promise<DishDataType>),
    onSuccess: (data) => {
      setDishData(data);
    },
    refetchOnWindowFocus: false,
  });

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newDishData = Array.from(dishData);
    if (destination.droppableId === "dish") {
      newDishData.splice(source.index, 1);
      newDishData.splice(destination.index, 0, dishData[source.index]);
      setDishData(newDishData);
    }

    if (destination.droppableId === "vote-action") {
      const voteDataArray = Array.from(voteData);
      const currentIndexData = voteDataArray[destination.index];

      voteDataArray.splice(destination.index, 1);
      voteDataArray.splice(destination.index, 0, dishData[source.index]);

      if (voteDataArray.length > 3) {
        voteDataArray.pop();
        return;
      }

      if (Object.keys(currentIndexData).length > 0) {
        newDishData.splice(source.index, 1, currentIndexData);
      } else {
        newDishData.splice(source.index, 1);
      }

      setDishData(newDishData);
      setVoteData(voteDataArray);
    }
  };

  return (
    <Page title="React Dish Poll: Home">
      <Grid container spacing={4}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid item xs={6}>
            <DishPollList
              dishListData={dishData}
              setSelectedDish={setSelectedDish}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DishPollAction
              voteData={voteData}
              selectedDish={selectedDish}
              setSelectedDish={setSelectedDish}
            />
          </Grid>
        </DragDropContext>
      </Grid>
    </Page>
  );
};

export default HomePage;

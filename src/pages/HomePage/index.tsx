import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import DishPollList from "./DishPollList";
import DishPollAction from "./DishPollAction";
import { DishData } from "../../data";

const HomePage = () => {
  const [dishData, setDishData] = useState<typeof DishData>([]);

  const handleDragEnd = (
    { destination, source, draggableId }: DropResult,
    provided: ResponderProvided
  ) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    // dish , vote-action

    const newDishData = Array.from(dishData);
    newDishData.splice(source.index, 1);
    newDishData.splice(destination.index, 0, dishData[source.index]);
    setDishData(newDishData);
  };

  useEffect(() => {
    setDishData(DishData);
  }, []);

  return (
    <Grid container spacing={2}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid item xs={6}>
          <DishPollList id={"dish"} dishListData={dishData} />
        </Grid>

        <Grid item xs={6}>
          <DishPollAction />
        </Grid>
      </DragDropContext>
    </Grid>
  );
};

export default HomePage;

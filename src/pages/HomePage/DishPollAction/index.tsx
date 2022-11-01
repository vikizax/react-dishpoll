import { Stack } from "@mui/material";
import DishDescription from "./DishDescription";
import PollVote from "./PollVote";

const DishPollAction = () => {
  return (
    <Stack gap={2}>
      <DishDescription />
      <PollVote />
    </Stack>
  );
};

export default DishPollAction;

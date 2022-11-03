import { Stack } from "@mui/material";
import DishDescription from "../../../components/DishDescription";
import PollVote from "./PollVote";
import { DishDataType, DishType } from "../../../data";
import { IDishPollActionProps } from "./interface";

// interface IDishPollActionProps {
//   voteData: DishDataType;
//   selectedDish: DishType;
//   setSelectedDish: Dispatch<SetStateAction<DishType>>;
// }

const DishPollAction = ({
  voteData,
  selectedDish,
  setSelectedDish,
}: IDishPollActionProps) => {
  return (
    <Stack gap={2}>
      <DishDescription dish={selectedDish} />
      <PollVote voteData={voteData} setSelectedDish={setSelectedDish} />
    </Stack>
  );
};

export default DishPollAction;

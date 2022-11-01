import { Typography, Button, Stack } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import { Container } from "./style";

const PollVote = () => {
  return (
    <Stack sx={{ border: "1px solid rgba(0,0,0,0.1)", padding: 2 }}>
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        width={"100%"}
      >
        <Typography variant="h5">Vote</Typography>
        <Button variant="contained" disableElevation color="secondary">
          Submit
        </Button>
      </Stack>
      <Droppable droppableId="vote-action">
        {({ droppableProps, innerRef, placeholder }) => (
          <div {...droppableProps} ref={innerRef}>
            {placeholder}
          </div>
        )}
      </Droppable>
    </Stack>
  );
};

export default PollVote;

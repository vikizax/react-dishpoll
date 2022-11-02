import {
  Typography,
  Button,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Stars } from "@mui/icons-material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { IPollVoteProps } from "./interface";
import { memo } from "react";

const BADGE_COLOR = ["#b68424", "#c3bdbd", "#81785f"];

const PollVote = ({ voteData, setSelectedDish }: IPollVoteProps) => {
  return (
    <Stack
      sx={{ border: "1px solid rgba(0,0,0,0.1)", padding: 2, overflow: "auto" }}
    >
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
          <List
            sx={{
              width: "100%",
            }}
            ref={innerRef}
            {...droppableProps}
          >
            {voteData.map((data, idx) => (
              <Draggable
                draggableId={`rank-${idx}`}
                index={idx}
                key={`vote-drag-${idx}`}
                isDragDisabled
              >
                {({ draggableProps, innerRef, dragHandleProps }) => (
                  <ListItemButton
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      mb: 1,
                      bgcolor: "background.paper",
                    }}
                    {...draggableProps}
                    {...dragHandleProps}
                    ref={innerRef}
                    key={`vote-item-${idx}`}
                    onMouseDown={() => setSelectedDish(voteData[idx])}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={data?.dishName?.toLowerCase()}
                        src={`${data?.image}?${data?.id}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={data?.dishName ?? `Rank ${idx + 1}`}
                    />
                    {Object.keys(data).length > 0 && (
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Typography variant="body2" fontWeight={"bold"}>
                          Rank {idx + 1}
                        </Typography>
                        <Stars
                          fontSize="large"
                          sx={{ fill: BADGE_COLOR[idx] }}
                        />
                      </Stack>
                    )}
                  </ListItemButton>
                )}
              </Draggable>
            ))}
            {placeholder}
          </List>
        )}
      </Droppable>
    </Stack>
  );
};

export default memo(PollVote);

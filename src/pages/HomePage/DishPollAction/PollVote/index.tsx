import {
  Typography,
  Button,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { Stars } from "@mui/icons-material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import { IPollVoteProps, ISnackData } from "./interface";
import { memo, useContext, useState } from "react";
import { elipsify } from "../../../../utility/elipsify";
import { addVoteHandler } from "../../../../db";
import { BADGE_COLOR, RANK_POINT } from "../../../../constants";
import { AuthContext } from "../../../../context";

const PollVote = ({ voteData, setSelectedDish }: IPollVoteProps) => {
  const navigate = useNavigate();
  const {
    auth: { username },
  } = useContext(AuthContext);

  const [snackData, setSnackData] = useState<ISnackData>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleVoteSubmit = () => {
    let isValid = true;
    voteData.forEach((vote) => {
      if (Object.keys(vote).length <= 0) isValid = false;
    });

    if (!isValid) {
      setSnackData({
        open: true,
        message: "Please vote for all three ranks!",
        severity: "info",
      });
      return;
    }

    addVoteHandler({
      username: username,
      voteData: voteData.map((vote, idx) => ({
        dishId: vote.id,
        point: RANK_POINT[idx],
      })),
    });

    setSnackData({
      open: true,
      message: "Vote submitted!",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/leaderboard");
    }, 1000);
  };

  const handleSnackClose = () => {
    setSnackData((prev) => ({ ...prev, open: false }));
  };

  return (
    <Stack
      sx={{
        border: "1px solid rgba(0,0,0,0.1)",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        width={"100%"}
      >
        <Typography variant="h5">Vote</Typography>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          onClick={handleVoteSubmit}
        >
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
                      primary={
                        data?.dishName
                          ? elipsify(data.dishName)
                          : `Rank ${idx + 1}`
                      }
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

      <Snackbar
        open={snackData.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert onClose={handleSnackClose} severity={snackData.severity}>
          {snackData.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default memo(PollVote);

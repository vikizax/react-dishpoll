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
import { useNavigate } from "react-router-dom";
import { IUserSubmissionRankProps } from "./interface";
import { memo } from "react";
import { elipsify } from "../../../utility/elipsify";
import { BADGE_COLOR, RANK_GRAD_COLOR } from "../../../constants";

const UserSubmissionRank = ({
  voteData,
  setSelectedDish,
}: IUserSubmissionRankProps) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate("/");

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
        <Typography variant="h5">Your Dish Submission</Typography>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Stack>

      <List
        sx={{
          width: "100%",
        }}
      >
        {voteData.map((data, idx) => (
          <ListItemButton
            sx={{
              border: "1px solid rgba(0,0,0,0.1)",
              mb: 1,
              background: data.rank ? RANK_GRAD_COLOR[data.rank - 1] : "",
            }}
            key={`vote-item-${idx}`}
            onClick={() => setSelectedDish(voteData[idx])}
          >
            <ListItemAvatar>
              <Avatar
                alt={data?.dishName?.toLowerCase()}
                src={`${data?.image}?${data?.id}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={data?.dishName ? elipsify(data.dishName) : `NA`}
            />
            {voteData.length > 0 && (
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <Typography variant="body2" fontWeight={"bold"}>
                  Rank {data.rank}
                </Typography>
                <Stars
                  fontSize="large"
                  sx={{
                    fill: data.rank
                      ? data.rank - 1 <= 3
                        ? BADGE_COLOR[data.rank - 1]
                        : "#4f4f4f"
                      : "#4f4f4f",
                  }}
                />
              </Stack>
            )}
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
};

export default memo(UserSubmissionRank);

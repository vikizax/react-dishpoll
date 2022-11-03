import { useState, useRef, useEffect, memo } from "react";
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Stack,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Container } from "./styles";
import {
  ILeaderboardProps,
  IDishIdToRankType,
  DishRankType,
} from "./interface";
import { elipsify } from "../../../utility/elipsify";
import { getAllVoteDataHandler } from "../../../db";
import { IDishIdToDishType } from "../interface";
import { Stars, Pending } from "@mui/icons-material";
import { BADGE_COLOR, RANK_GRAD_COLOR } from "../../../constants";
const LeaderboardList = ({
  dishRankList,
  isLoading,
  setSelectedDish,
}: ILeaderboardProps) => {
  console.log({ isLoading });
  const headerRef = useRef<HTMLDivElement>(null);
  return (
    <Container>
      <Typography variant="h5" ref={headerRef} mb={4}>
        Dish Ranking
      </Typography>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <SimpleBar
          style={{
            maxHeight: headerRef.current
              ? `calc(100% - ${headerRef.current.clientHeight + 40}px)`
              : "90%",
            flex: 1,
          }}
        >
          <List
            sx={{
              width: "100%",
              cursor: "grab",
            }}
          >
            {dishRankList.map(({ dishName, id, image, points }, idx) => (
              <ListItemButton
                sx={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  mb: 1,
                  background: RANK_GRAD_COLOR[idx],
                  zIndex: 1,
                }}
                key={"item-" + idx}
                onClick={() => setSelectedDish(dishRankList[idx])}
              >
                <ListItemAvatar>
                  <Avatar src={`${image}?${id}`} alt={dishName.toLowerCase()} />
                </ListItemAvatar>
                <ListItemText primary={elipsify(dishName ?? "")} />
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Rank {points !== 0 ? idx + 1 : "NA"}
                  </Typography>
                  {points !== 0 ? (
                    <Stars
                      fontSize="large"
                      sx={{ fill: BADGE_COLOR[idx] ?? "#4f4f4f" }}
                    />
                  ) : (
                    <Pending fontSize="large" sx={{ fill: "#4f4f4f" }} />
                  )}
                </Stack>
              </ListItemButton>
            ))}
          </List>
        </SimpleBar>
      )}
    </Container>
  );
};

export default memo(LeaderboardList);

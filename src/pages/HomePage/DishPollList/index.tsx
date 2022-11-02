import { memo, useRef } from "react";
import {
  Typography,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Container } from "./styles";
import { IDishPollListProps } from "./interface";

const DishPollList = ({
  dishListData,
  setSelectedDish,
  isLoading,
}: IDishPollListProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Typography variant="h5" ref={headerRef} mb={4}>
        Dish Poll
      </Typography>

      {isLoading ? (
        <LinearProgress />
      ) : (
        <Droppable droppableId={"dish"}>
          {({ droppableProps, innerRef, placeholder }) => (
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
                ref={innerRef}
                {...droppableProps}
              >
                {dishListData.map(({ dishName, id, image }, idx) => (
                  <Draggable
                    draggableId={idx + ""}
                    index={idx}
                    key={"drag" + idx}
                  >
                    {({ draggableProps, innerRef, dragHandleProps }) => (
                      <ListItemButton
                        sx={{
                          border: "1px solid rgba(0,0,0,0.1)",
                          mb: 1,
                          bgcolor: "background.paper",
                          zIndex: 1,
                        }}
                        {...draggableProps}
                        {...dragHandleProps}
                        ref={innerRef}
                        key={"item-" + idx}
                        onMouseDown={() => setSelectedDish(dishListData[idx])}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={dishName.toLowerCase()}
                            src={`${image}?${id}`}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={dishName} />
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </List>
            </SimpleBar>
          )}
        </Droppable>
      )}
    </Container>
  );
};

export default memo(DishPollList);

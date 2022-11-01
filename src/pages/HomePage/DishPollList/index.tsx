import { useRef } from "react";
import {
  Typography,
  TextField,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { Search as SearchIcon } from "@mui/icons-material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Container, AutocompleteContainer } from "./styles";
import { IDishPollListProps } from "./interface";

const DishPollList = ({ id, dishListData }: IDishPollListProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  console.log({ dishListData });
  return (
    <Container>
      <Stack gap={1} ref={headerRef}>
        <Typography variant="h5">Dish Poll</Typography>
        <AutocompleteContainer>
          <Autocomplete
            disablePortal
            options={[]}
            sx={{
              width: "60%",
              "& .MuiAutocomplete-popupIndicator": {
                transform: "rotate(0)",
              },
              mb: 1,
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Dish" />
            )}
            fullWidth={false}
            popupIcon={<SearchIcon />}
          />
        </AutocompleteContainer>
      </Stack>

      <Droppable droppableId={id}>
        {({ droppableProps, innerRef, placeholder }) => (
          <SimpleBar
            style={{
              maxHeight: headerRef.current
                ? `calc(100% - ${headerRef.current.clientHeight}px)`
                : "90%",
              flex: 1,
            }}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
              ref={innerRef}
              {...droppableProps}
            >
              {dishListData.map(({ dishName, id, image }, idx) => (
                <Draggable draggableId={idx + ""} index={idx} key={"drag" + idx}>
                  {({ draggableProps, innerRef, dragHandleProps }) => (
                    <ListItem
                      sx={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        mb: 1,
                        bgcolor: "background.paper",
                      }}
                      {...draggableProps}
                      {...dragHandleProps}
                      ref={innerRef}
                      key={"test=" + idx}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={dishName.toLowerCase()}
                          src={`${image}?${id}`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={dishName} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </List>
          </SimpleBar>
        )}
      </Droppable>
    </Container>
  );
};

export default DishPollList;

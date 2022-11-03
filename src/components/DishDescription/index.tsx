import { memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IDishDescriptionProps } from "./interface";

const DishDescription = ({ dish }: IDishDescriptionProps) => {
  const { description, dishName, id, image } = dish;

  return (
    <Card elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
      <CardMedia
        component="img"
        height="240"
        image={image ? `${image}?${id}` : "https://joeschmoe.io/api/v1/random"}
        alt={`${dishName ? dishName.toLowerCase() + "-" : ""}image`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dishName?.trim().length > 0 ? dishName : "Your Selected Dish"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description?.trim().length > 0
            ? description
            : "Please click a dish to see it's description."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(DishDescription);

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const DishDescription = () => {
  return (
    <Card elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
      <CardMedia
        component="img"
        height="240"
        image="https://joeschmoe.io/api/v1/random"
        alt="green iguana"
        sx={{ objectFit: "fill" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DishDescription;

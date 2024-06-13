import { useGetMajorCurrenciesQuery } from "../../api/currenciesApi";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const MajorCurrenciesCard = ({ strCode }) => {
  const { data, isLoading, isError } = useGetMajorCurrenciesQuery(strCode);
  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" width={350} height={125} />
      </>
    );
  } else if (isError) {
    return;
  } else {
    console.log(data);
    return (
      <>
        <Card sx={{ maxWidth: 350, backgroundColor: "secondary.main" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="span">
                {data.course}
                {data.is_more == 1 && (
                  <TrendingUpIcon fontSize={"medium"} color={"success"} />
                )}
                {data.is_more == -1 && (
                  <TrendingDownIcon fontSize={"medium"} color={"error"} />
                )}
                {data.is_more == 0 && <TrendingFlatIcon fontSize={"medium"} />}
              </Typography>
              <Typography
                marginLeft={10}
                gutterBottom
                variant="h5"
                component="span"
              >
                {strCode}
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {data.previous_days.map((item) => (
                  <Grid item xs={6} key={item.date}>
                    <Typography component="span" sx={{ color: "grey" }}>
                      (
                      {new Date(item.date).toLocaleDateString("en-gb", {
                        month: "numeric",
                        day: "numeric",
                      })}
                      ) {item.course}
                      {item.is_more == 1 && (
                        <TrendingUpIcon fontSize={"small"} color={"success"} />
                      )}
                      {item.is_more == -1 && (
                        <TrendingDownIcon fontSize={"small"} color={"error"} />
                      )}
                      {item.is_more == 0 && (
                        <TrendingFlatIcon fontSize={"small"} />
                      )}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
};

export default MajorCurrenciesCard;

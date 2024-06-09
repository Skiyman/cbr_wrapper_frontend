import "./CurrenciesTable.scss";
import { useGetCurrenciesTodayQuery } from "../../api/currenciesApi";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

const CurrenciesTable = () => {
  const { data, isLoading, isError } = useGetCurrenciesTodayQuery();
  if (isLoading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "250px",
          }}
        >
          <CircularProgress size={100} color="secondary" thickness={5} />
        </div>
      </>
    );
  } else if (isError) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "250px",
          }}
        >
          <Typography
            variant="h3"
            noWrap
            component="h3"
            color="#fff"
            gutterBottom
            sx={{
              fontSize: { xs: "16px", md: "28px" },
            }}
            bgcolor={red}
          >
            Ошибка сервера 500
          </Typography>
        </div>
      </>
    );
  }
  return (
    <TableContainer
      className={"table__container"}
      component={Paper}
      sx={{ maxHeight: 440, maxWidth: "75%", margin: "0px auto" }}
    >
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              Code
            </TableCell>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              Name
            </TableCell>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              Denomination
            </TableCell>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              Rate
            </TableCell>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              ISO Code
            </TableCell>
            <TableCell sx={{ backgroundColor: "secondary.main" }} align="right">
              Unit Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "secondary.main" }}>
          {data.map((row) => (
            <TableRow key={row.currency_iso_code}>
              <TableCell> {row.currency_str_code}</TableCell>
              <TableCell align="right">{row.currency_name}</TableCell>
              <TableCell align="right">{row.currency_denomination}</TableCell>
              <TableCell align="right">{row.currency_rate}</TableCell>
              <TableCell align="right">{row.currency_iso_code}</TableCell>
              <TableCell align="right">{row.currency_unit_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CurrenciesTable;

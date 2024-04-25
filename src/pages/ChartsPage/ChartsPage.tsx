import * as React from "react";
import Typography from "@mui/material/Typography";
import { useGetCurrenciesCodesQuery } from "../../api/currenciesApi";
import MenuItem from "@mui/material/MenuItem";
import { Select, SelectChangeEvent } from "@mui/material";

// @ts-ignore
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";

const ChartsPage = () => {
  const { data, isLoading, isSuccess } = useGetCurrenciesCodesQuery();
  const [selectedCurrency, setSelectedCurrency] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value as string);
  };
  let a = moment([2000, 0, 29]);
  let b = moment([2007, 0, 28]);
  if (isSuccess)
    return (
      <>
        <div className="container">
          <Typography
            variant="h3"
            noWrap
            component="h3"
            color="#fff"
            gutterBottom
          >
            Графики валют
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCurrency}
            label="Age"
            onChange={handleChange}
            sx={{ mr: 1 }}
          >
            {data.map((item) => (
              <MenuItem
                key={item.currency_code}
                value={item.currency_code}
              >{`${item.currency_name} (${item.currency_str_code})`}</MenuItem>
            ))}
          </Select>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker sx={{ mr: 1 }} />
            <DatePicker sx={{ mr: 1 }} />
          </LocalizationProvider>
          <Button variant="contained" size="large">
            Confirm
          </Button>
        </div>
      </>
    );
};

export default ChartsPage;

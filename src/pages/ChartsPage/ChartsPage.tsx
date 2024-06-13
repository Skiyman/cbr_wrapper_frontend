import * as React from "react";
import Typography from "@mui/material/Typography";
import { useGetCurrenciesCodesQuery } from "../../api/currenciesApi";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select } from "@mui/material";

// @ts-ignore
import moment, { Moment } from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import {
  ICurrencyDynamic,
  ICurrencyDynamicRequest,
} from "../../interfaces/ICurrencyDynamic";
import axios, { AxiosResponse } from "axios";
import { apiUrl } from "../../components/consts";
import CurrencyChart from "../../components/CurrenciesChart/CurrencyChart";

const ChartsPage = () => {
  const { data, isLoading, isSuccess } = useGetCurrenciesCodesQuery();
  const [selectedCurrency, setSelectedCurrency] = React.useState("");
  const [currencyDynamic, setCurrencyDynamic] = React.useState<
    ICurrencyDynamic[]
  >([]);

  if (isSuccess) {
    const formValues: ICurrencyDynamicRequest = {
      strCode: data[0].currency_code,
      startDate: "",
      endDate: "",
    };

    return (
      <>
        <div className="container">
          <Typography variant="h3" noWrap component="h3" gutterBottom>
            Графики валют
          </Typography>
          <Formik
            initialValues={formValues}
            onSubmit={(values: ICurrencyDynamicRequest, { setSubmitting }) => {
              setTimeout(() => {
                values.startDate = new Date(values.startDate).toISOString();
                values.endDate = new Date(values.endDate).toISOString();

                axios
                  .put(
                    apiUrl +
                      `currencies/dynamic/${values.strCode}?begin_date=${values.startDate}&end_date=${values.endDate}`,
                  )
                  .then(function (response: AxiosResponse<ICurrencyDynamic[]>) {
                    setCurrencyDynamic(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, touched, setFieldValue }) => {
              return (
                <Form>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="currency-select-label">
                      Выберите валюту
                    </InputLabel>
                    <Select
                      labelId="currency-select-label"
                      value={selectedCurrency}
                      onChange={(event) => {
                        setSelectedCurrency(event.target.value as string);
                        return setFieldValue(
                          "strCode",
                          event.target.value,
                          true,
                        );
                      }}
                      label="Выберите валюту"
                      sx={{ mr: 1 }}
                    >
                      {data.map((item) => (
                        <MenuItem
                          key={item.currency_code}
                          value={item.currency_code}
                        >{`${item.currency_name} (${item.currency_str_code})`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      onChange={(value) =>
                        setFieldValue("startDate", value.add(12, "h"), true)
                      }
                      sx={{ mr: 1 }}
                    />
                    <DatePicker
                      onChange={(value) =>
                        setFieldValue("endDate", value.add(12, "h"), true)
                      }
                      sx={{ mr: 1 }}
                    />
                  </LocalizationProvider>
                  <Button variant="contained" size="large" type="submit">
                    Confirm
                  </Button>
                </Form>
              );
            }}
          </Formik>
          {currencyDynamic.length > 0 && (
            <CurrencyChart currencyDynamicData={currencyDynamic} />
          )}
        </div>
      </>
    );
  }
};

export default ChartsPage;

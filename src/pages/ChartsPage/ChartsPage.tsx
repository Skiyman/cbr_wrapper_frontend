import * as React from "react";
import Typography from "@mui/material/Typography";
import { useGetCurrenciesCodesQuery } from "../../api/currenciesApi";
import MenuItem from "@mui/material/MenuItem";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

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
import { red } from "@mui/material/colors";
import Container from "@mui/material/Container";

const ChartsPage = () => {
  const { data, isLoading, isSuccess } = useGetCurrenciesCodesQuery();
  const [selectedCurrency, setSelectedCurrency] = React.useState("");
  const [currencyDynamic, setCurrencyDynamic] = React.useState<
    ICurrencyDynamic[]
  >([]);
  const [isRequested, setIsRequested] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);

  if (isSuccess) {
    const formValues: ICurrencyDynamicRequest = {
      strCode: data[0].currency_code,
      startDate: "",
      endDate: "",
    };

    return (
      <>
        <div className="container">
          <Typography
            variant="h3"
            noWrap
            component="h3"
            gutterBottom
            sx={{
              ml: { xs: 2, md: 2, xl: 0 },
            }}
          >
            Графики валют
          </Typography>
          <Formik
            className={"form-container"}
            initialValues={formValues}
            onSubmit={(values: ICurrencyDynamicRequest, { setSubmitting }) => {
              setTimeout(() => {
                values.startDate = new Date(values.startDate).toISOString();
                values.endDate = new Date(values.endDate).toISOString();
                setIsRequested(false);
                setSpinner(true);
                axios
                  .put(
                    apiUrl +
                      `currencies/dynamic/${values.strCode}?begin_date=${values.startDate}&end_date=${values.endDate}`,
                  )
                  .then(function (response: AxiosResponse<ICurrencyDynamic[]>) {
                    setCurrencyDynamic(response.data);
                    setIsRequested(true);
                    setSpinner(false);
                  })
                  .catch(function (error) {
                    console.log(error);
                    setSpinner(false);
                  });

                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, touched, setFieldValue }) => {
              return (
                <Form>
                  <Container
                    component={"div"}
                    sx={{
                      gap: 2,
                      maxWidth: { md: 600 },
                      display: { xs: "flex" },
                      flexDirection: { xs: "column" },
                    }}
                  >
                    <FormControl>
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
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{ mb: 5 }}
                    >
                      Confirm
                    </Button>
                  </Container>
                </Form>
              );
            }}
          </Formik>
          {currencyDynamic.length > 0 && (
            <Container sx={{ mb: 10 }}>
              <CurrencyChart currencyDynamicData={currencyDynamic} />
            </Container>
          )}
          {isRequested && currencyDynamic.length === 0 && (
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
                  Данных не найдено
                </Typography>
              </div>
            </>
          )}
          {spinner && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "250px",
                }}
              >
                <CircularProgress size={100} color="primary" thickness={5} />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default ChartsPage;

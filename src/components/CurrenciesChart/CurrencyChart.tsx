import { ICurrencyDynamic } from "../../interfaces/ICurrencyDynamic";
import { LineChart } from "@mui/x-charts";

interface chartProps {
  currencyDynamicData: ICurrencyDynamic[];
}

const CurrencyChart = (props: chartProps) => {
  const datesValues = props.currencyDynamicData.map((item) =>
    new Date(item.currency_date).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  );

  const rateValues = props.currencyDynamicData.map(
    (item) => item.currency_rate,
  );
  console.log(props.currencyDynamicData);
  if (props.currencyDynamicData) {
    return (
      <>
        <LineChart
          xAxis={[
            {
              data: datesValues,
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: rateValues,
            },
          ]}
          height={300}
          margin={{ top: 40, bottom: 20 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </>
    );
  }
};

export default CurrencyChart;

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
        width={1000}
        height={400}
        grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
};

export default CurrencyChart;

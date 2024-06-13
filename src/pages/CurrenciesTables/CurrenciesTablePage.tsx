import "../../components/CurrenciesTables/CurrenciesTable.scss";
import MajorCurrenciesCard from "../../components/MajorCurrenciesCard/MajorCurrenciesCard";
import CurrenciesTable from "../../components/CurrenciesTables/CurrenciesTable";
import "./CurrenciesTablePage.scss";
import Container from "@mui/material/Container";

const CurrenciesTablePage = () => {
  return (
    <>
      <Container
        className={"card__container"}
        disableGutters
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <div className="card">
          <MajorCurrenciesCard strCode={"USD"}></MajorCurrenciesCard>
        </div>
        <div className="card">
          <MajorCurrenciesCard strCode={"EUR"}></MajorCurrenciesCard>
        </div>
        <div className="card">
          <MajorCurrenciesCard strCode={"GBP"}></MajorCurrenciesCard>
        </div>
      </Container>
      <CurrenciesTable></CurrenciesTable>
    </>
  );
};
export default CurrenciesTablePage;

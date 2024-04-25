import * as React from "react";
import { useState } from "react";
import { ICurrencyData } from "../../interfaces/ICurrenciesData";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./CurrenciesTable.scss";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetCurrenciesTodayQuery } from "../../api/currenciesApi";
import { red } from "@mui/material/colors";

const CurrenciesTable = () => {
  const [appState, setAppState] = useState();
  const { data, isLoading, isError, isFetching } = useGetCurrenciesTodayQuery();

  // useEffect(() => {
  //   if (responseData != null) return;
  //   axios.get(apiUrl + "currencies").then((resp) => {
  //     setResponseData(resp.data);
  //   });
  // }, [responseData]);

  // useEffect(() => {}, [setAppState])

  const [search, setSearch] = useState("");

  const columnHelper = createColumnHelper<ICurrencyData>();

  const columns = [
    columnHelper.accessor("currency_str_code" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => "Code",
    }),
    columnHelper.accessor("currency_name" as keyof ICurrencyData, {
      cell: (info) => (
        <span className={"currency__name"}> {info.getValue()}</span>
      ),
      header: () => "Name",
    }),
    columnHelper.accessor("currency_denomination" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => "Denomination",
    }),
    columnHelper.accessor("currency_rate" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => "Rate",
    }),
    columnHelper.accessor("currency_iso_code" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => "ISO code",
    }),
    columnHelper.accessor("currency_unit_rate" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => "Unit rate",
    }),
  ];

  const table = useReactTable<ICurrencyData>({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

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
    <>
      <div className="container">
        <Typography
          variant="h3"
          noWrap
          component="h3"
          color="#fff"
          gutterBottom
          sx={{
            fontSize: { xs: "16px", md: "28px" },
          }}
        >
          Курс валют на сегодня
        </Typography>
        <div className="table__container">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={"table-body"}>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => console.log(row.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CurrenciesTable;

import axios from "axios";
import { apiUrl } from "../consts";
import { useEffect, useState } from "react";
import { ICurrencyData } from "../../interfaces/ICurrenciesData";
import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const CurrenciesTable = () => {
  const [appState, setAppState] = useState();
  const [responseData, setResponseData] = useState<ICurrencyData[] | null>(
    null
  );
  // TODO: RTK query
  useEffect(() => {
    if (responseData != null) return;
    axios.get(apiUrl + "currencies").then((resp) => {
      setResponseData(resp.data);
    });
  }, [responseData]);

  // useEffect(() => {}, [setAppState])

  const [search, setSearch] = useState("");

  const columnHelper = createColumnHelper<ICurrencyData>();

  const columns = [
    columnHelper.accessor("currency_str_code" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>Code</span>,
    }),
    columnHelper.accessor("currency_name" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("currency_denomination" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>Denomination</span>,
    }),
    columnHelper.accessor("currency_rate" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>Rate</span>,
    }),
    columnHelper.accessor("currency_iso_code" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>currency_iso_code</span>,
    }),
    columnHelper.accessor("currency_iso_code" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>ISO code</span>,
    }),
    columnHelper.accessor("currency_unit_rate" as keyof ICurrencyData, {
      cell: (info) => info.getValue(),
      header: () => <span>Unit rate</span>,
    }),
  ];

  const table = useReactTable<ICurrencyData>({
    columns,
    data: responseData ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (responseData === null) {
    return (
      <>
        <div>IDI NAHUI</div>
      </>
    );
  }

  return (
    <>
      <div className="p-2">
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
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.original.currency_iso_code}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
      </div>
    </>
  );
};

export default CurrenciesTable;

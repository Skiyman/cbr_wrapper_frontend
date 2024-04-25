import * as React from "react";
import { ICurrencyData } from "../../interfaces/ICurrenciesData";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetCurrenciesTodayQuery } from "../../api/currenciesApi";

const CurrenciesTable = () => {
  const { data, isLoading, isError, isFetching } = useGetCurrenciesTodayQuery();

  // TODO: RTK query
  // useEffect(() => {
  //   if (responseData != null) return;
  //   axios.get(apiUrl + "currencies").then((resp) => {
  //     setResponseData(resp.data);
  //   });
  // }, [responseData]);

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
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }

  if (isError) {
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
                          header.getContext(),
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

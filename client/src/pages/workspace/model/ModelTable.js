import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTable, useSortBy } from "react-table";

function ModelTable({ data, header }) {
  const tableInstance = useTable({ columns: header, data }, useSortBy);

  return (
    <table
      {...tableInstance.getTableProps()}
      className="w-full border border-collapse"
    >
      <thead>
        {tableInstance.headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="bg-primary-900 text-white p-2 border"
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FontAwesomeIcon
                        icon={icon({
                          name: "caret-down",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={icon({
                          name: "caret-up",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90"
                      />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
            <th className="bg-primary-900 text-white py-2 border">Manage</th>
          </tr>
        ))}
      </thead>
      <tbody {...tableInstance.getTableBodyProps()}>
        <tr className="border-t">
          {header.map((val) => {
            return (
              <td className="p-2 border">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder={val.Header}
                  required
                />
              </td>
            );
          })}
          <td className="p-2 border text-center">
            <button className="flex items-center justify-center bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-md font-medium">
              <FontAwesomeIcon
                icon={icon({
                  name: "plus",
                  style: "solid",
                })}
                className="text-lg w-8"
              />
              <span>Add</span>
            </button>
          </td>
        </tr>
        {tableInstance.rows.map((row) => {
          tableInstance.prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-t">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-2 border">
                  {cell.render("Cell")}
                </td>
              ))}
              <td className="p-2">
                <div className="flex justify-evenly">
                  <FontAwesomeIcon
                    icon={icon({
                      name: "pen-to-square",
                      style: "solid",
                    })}
                    className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                  />
                  <FontAwesomeIcon
                    icon={icon({
                      name: "trash",
                      style: "solid",
                    })}
                    className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ModelTable;

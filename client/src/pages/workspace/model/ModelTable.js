import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useTable, useSortBy } from "react-table";
import { useDispatch } from "react-redux";
import {
  fetchAddDataModels,
  fetchEditDataModels,
  fetchDeleteDataModels,
} from "../../../actions/dataModelActions";
import modelUtils from "../../../utils/modelUtils";
import { fetchGetModelDetail } from "../../../actions/modelActions";
import { useLocation } from "react-router-dom";

function ModelTable({ data, header, refresh, highlight }) {
  const tableInstance = useTable({ columns: header, data }, useSortBy);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  const [tableHeader, setTableHeader] = useState(header);

  const handleInputChange = (e, header) => {
    const { value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [header]: value,
    }));
  };

  const isValidInput = () => {
    for (const key in inputValues) {
      if (!inputValues[key]) {
        return false;
      }
    }
    return true;
  };

  const handleAddField = async () => {
    if (!isValidInput()) {
      window.alert("The value provided already exists!");
      return;
    }

    try {
      await dispatch(
        fetchAddDataModels(modelUtils.getCurrentID(), inputValues)
      );
      refresh();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditField = (index) => {
    setEditingIndex(index);
  };

  const handleSaveField = async (index) => {
    const newData = { ...data[index], ...inputValues, id: editingIndex };
    try {
      await dispatch(fetchEditDataModels(modelUtils.getCurrentID(), newData));
      refresh();
      setEditingIndex(null);
      setInputValues({});
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setInputValues({});
  };

  const handleDeleteRow = async (index) => {
    if (window.confirm("Do you want to delete data?") == true) {
      try {
        await dispatch(fetchDeleteDataModels(modelUtils.getCurrentID(), index));
        refresh();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const highlightText = (text) => {
    if (typeof text !== "string") return text;

    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    return text.replace(
      regex,
      `<mark style="background-color: #3368d1; color: white">$1</mark>`
    );
  };

  const loadDefaulHeader = async () => {
    try {
      setTimeout(async () => {
        const data = await dispatch(
          fetchGetModelDetail(modelUtils.getCurrentID())
        );

        if (data.status === true) {
          const tableData = data.data.tables.map((table) => ({
            Header: table.name,
            accessor: table.name,
            type: table.type,
          }));
          console.log(data.data.tables);
          setTableHeader(tableData);
        }
      }, 50);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const location = useLocation();
  useEffect(() => {
    loadDefaulHeader();
  }, [location]);

  function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <form onSubmit={handleAddField}>
      <table
        {...tableInstance.getTableProps()}
        className="w-full border border-collapse"
      >
        <thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className="bg-primary-900 text-white p-2 border"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      <FontAwesomeIcon
                        icon={icon({
                          name: "caret-down",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90"
                      />
                    ) : null}
                  </span>
                </th>
              ))}
              <th className="bg-primary-900 text-white py-2 border">Manage</th>
            </tr>
          ))}
        </thead>
        <tbody {...tableInstance.getTableBodyProps()}>
          <tr className="border-t">
            {tableHeader.map((val) => (
              <td className="p-2 border" key={val.accessor}>
                {val.accessor !== "id" && (
                  <input
                    type={
                      val.type === "date"
                        ? "date"
                        : val.type === "int"
                        ? "number"
                        : "text"
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={val.Header}
                    required
                    onChange={(e) => handleInputChange(e, val.Header)}
                  />
                )}
              </td>
            ))}
            <td className="p-2 text-center flex justify-center items-center">
              <button
                type="submit"
                className="flex items-center justify-center bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-md font-medium"
              >
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
          {tableInstance.rows.map((row, index) => {
            tableInstance.prepareRow(row);
            const isEditing = editingIndex === row.original.id;

            return (
              <tr {...row.getRowProps()} className="border-t" key={index}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-2 border"
                    key={cellIndex}
                  >
                    {cell.column.id !== "id" && isEditing ? (
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type={
                          tableHeader[cellIndex].type === "date"
                            ? "date"
                            : tableHeader[cellIndex].type === "int"
                            ? "number"
                            : "text"
                        }
                        value={
                          tableHeader[cellIndex].type !== "date"
                            ? inputValues[cell.column.id] !== undefined
                              ? inputValues[cell.column.id]
                              : cell.value
                            : inputValues[cell.column.id] !== undefined
                            ? formatDateToYYYYMMDD(inputValues[cell.column.id])
                            : formatDateToYYYYMMDD(
                                cell.value === null ? "" : cell.value
                              )
                        }
                        onChange={(e) => handleInputChange(e, cell.column.id)}
                      />
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            cell.value && cell.value.toString()
                          ),
                        }}
                      />
                    )}
                  </td>
                ))}
                <td className="p-2">
                  <div className="flex justify-evenly">
                    {isEditing ? (
                      <>
                        <FontAwesomeIcon
                          icon={icon({
                            name: "save",
                            style: "solid",
                          })}
                          className="scale-110 ml-2 opacity-90 cursor-pointer duration-75 text-primary-700 hover:text-primary-900"
                          onClick={() => handleSaveField(index)}
                        />
                        <FontAwesomeIcon
                          icon={icon({
                            name: "xmark",
                            style: "solid",
                          })}
                          className="scale-125 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                          onClick={() => handleCancelEdit()}
                        />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={icon({
                            name: "pen-to-square",
                            style: "solid",
                          })}
                          onClick={() => handleEditField(row.original.id)}
                          className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                        />
                        <FontAwesomeIcon
                          icon={icon({
                            name: "trash",
                            style: "solid",
                          })}
                          onClick={() => handleDeleteRow(row.original.id)}
                          className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </form>
  );
}

export default ModelTable;

import React, { useState, useEffect, useRef } from "react";
import ModelTable from "./ModelTable";
import { useDispatch } from "react-redux";
import {
  fetchGetDataModels,
  fetchAddExcel,
} from "../../../actions/dataModelActions";
import { useLocation } from "react-router-dom";
import modelUtils from "../../../utils/modelUtils";
import * as XLSX from "xlsx";

function ModelView() {
  const [data, setData] = useState([]);
  const [transformedArray, setTransformedArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHeader, setSelectedHeader] = useState("- All -");
  const dispatch = useDispatch();
  const location = useLocation();
  const searchRef = useRef(null);
  const fileInputRef = useRef(null);

  async function initState() {
    try {
      setTimeout(async () => {
        const response = await dispatch(
          fetchGetDataModels(modelUtils.getCurrentID())
        );
        if (response.status === true) {
          setData(response.data);

          setTransformedArray(
            Object.keys(response.data[0] || {}).map((key) => ({
              Header: key,
              accessor: key,
            }))
          );
        } else {
          setData([]);
        }
      }, 50);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const filterData = () => {
    return data.filter((item) => {
      return (
        (selectedHeader === "- All -" ||
          (item[selectedHeader] &&
            item[selectedHeader]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))) &&
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedHeader(selectedValue);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const binaryString = evt.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      //check header match
      const excelHeaders = excelData[0];
      const existingHeaders = Object.keys(data[0] || {});
      const headersMatch = excelHeaders.every((header) =>
        existingHeaders.includes(header)
      );

      if (!headersMatch) {
        alert("Imported data does not match existing headers!");
        return;
      }

      // call API to add Excel data
      try {
        const addExcelResponse = await dispatch(
          fetchAddExcel(modelUtils.getCurrentID(), excelData)
        );
        if (addExcelResponse.status === true) {
          window.location.reload();
        } else {
          console.error("Error adding Excel data:", addExcelResponse.error);
        }
      } catch (error) {
        console.error("Error adding Excel data:", error);
      }

      setData(excelData);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    initState();

    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [location, modelUtils]);

  return (
    <div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen min-w-72">
      <div className="head flex items-center justify-between gap-x-10 h-12">
        <h1 className="title text-2xl font-bold">
          {modelUtils.getCurrentName()}
        </h1>
        <div className="action flex gap-x-5 h-full">
          <div className="select">
            <select
              onChange={handleChange}
              value={selectedHeader}
              className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            >
              <option value="- All -">- All -</option>
              {Object.keys(data[0] || {}).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          <div className="relative rounded-md shadow-sm h-full flex-1 w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-full">
              <span className="text-gray-500 sm:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="grey"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="h-full w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Search..."
              ref={searchRef}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
              <p className="pr-4">
                Ctrl<span className="font-medium">+ K</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="data mt-5 flex-1 overflow-auto w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <ModelTable
          data={filterData()}
          header={transformedArray}
          refresh={initState}
          highlight={searchTerm}
        />
        <button
          className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 flex ml-auto shadow-sm items-center gap-x-3 mt-2 "
          onClick={() => fileInputRef.current.click()}
        >
          <div className="text-md flex items-center">
            <img
              className="h-5 mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/2170px-Microsoft_Excel_2013-2019_logo.svg.png"
              alt="Excel Logo"
            />
            Import
          </div>
        </button>
      </div>
    </div>
  );
}

export default ModelView;

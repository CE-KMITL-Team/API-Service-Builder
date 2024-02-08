import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import ModelTable from "./ModelTable";
import { useDispatch } from "react-redux";
import { fetchGetDataModels } from "../../../actions/dataModelActions";
import { WorkspaceUtils } from "../../../utils/workspaceUtils";

function ModelView() {
  const data = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      password: "securepass456",
      tel: "987-654-3210",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      password: "secret123",
      tel: "555-123-4567",
    },
    {
      name: "Eva Brown",
      email: "eva@example.com",
      password: "pass456word",
      tel: "789-456-1230",
    },
    {
      name: "Chris Miller",
      email: "chris@example.com",
      password: "chrispass789",
      tel: "234-567-8901",
    },
    {
      name: "Olivia White",
      email: "olivia@example.com",
      password: "olivia123pass",
      tel: "876-543-2109",
    },
    {
      name: "Daniel Lee",
      email: "daniel@example.com",
      password: "danielpassword",
      tel: "321-654-0987",
    },
    {
      name: "Grace Taylor",
      email: "grace@example.com",
      password: "gracepass456",
      tel: "654-789-0123",
    },
    {
      name: "Michael Davis",
      email: "michael@example.com",
      password: "michaelpass789",
      tel: "890-123-4567",
    },
    {
      name: "Sophia Green",
      email: "sophia@example.com",
      password: "sophia456pass",
      tel: "567-890-1234",
    },
    {
      name: "Henry Wilson",
      email: "henry@example.com",
      password: "henry123pass",
      tel: "012-345-6789",
    },
    {
      name: "Emma Harris",
      email: "emma@example.com",
      password: "emmapass789",
      tel: "789-012-3456",
    },
  ];

  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const keysArray = Object.keys(data[0]);

  const transformedArray = keysArray.map((key) => ({
    Header: key,
    accessor: key,
  }));

  const searchRef = useRef(null);

  // async function initState() {
  //   try {
  //     const data = await dispatch(fetchGetDataModels(WorkspaceUtils.getID()));
  //     if (data.status === true) {
  //       setData(data.data);
  //     } else {
  //       setData([]);
  //     }
  //     console.log("Data", data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  useEffect(() => {
    // initState();
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
  }, []);
  return (
    <div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen">
      <div className="head flex items-center justify-between gap-x-10 h-12">
        <h1 className="title text-2xl font-bold">User</h1>
        <div className="action flex gap-x-5 h-full">
          <div className="select">
            <select className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
              <option>- All -</option>
              {keysArray.map((val) => (
                <option>{val}</option>
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
              placeholder="Quick search..."
              ref={searchRef}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
              <p className="pr-4">
                Ctrl
                <span className="font-medium">+ K</span>
              </p>
            </div>
          </div>
          <button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 flex shadow-sm items-center gap-x-3">
            <FontAwesomeIcon
              icon={icon({
                name: "file-import",
                style: "solid",
              })}
              className="scale-105"
            />
            <div className="text-md">Import</div>
          </button>
        </div>
      </div>
      <div className="data mt-5 flex-1 overflow-auto">
        <ModelTable data={data} header={transformedArray} />
      </div>
    </div>
  );
}

export default ModelView;

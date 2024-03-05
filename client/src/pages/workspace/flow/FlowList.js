import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchGetFlows, fetchDeleteFlows } from "../../../actions/flowActions";
import { useDispatch } from "react-redux";
import workspaceUtils from "../../../utils/workspaceUtils";

function FlowList() {
  // ];
  const [flowLists, setFlowlist] = useState([]);
  console.log("flowLists", flowLists);
  const dispatch = useDispatch();

  const searchRef = useRef(null);
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // const [highlight, setHighlight] = useState(false);

  async function initialState() {
    try {
      const data = await dispatch(fetchGetFlows(workspaceUtils.getID()));

      if (data.status === true) {
        setFlowlist(data.data);
      } else {
        setFlowlist([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fileterData = () => {
    return flowLists.filter((item) => {
      return Object.keys(item).some((key) => {
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  };

  useEffect(() => {
    initialState();
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

  const handleAddFlow = () => {
    navigate(`/workspace/${projectName}/flows/unnamedFlow`);
  };

  const highlightText = (text) => {
    if (typeof text !== "string") return text;

    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      `<mark style="background-color: #3368d1; color: white">$1</mark>`
    );
  };

  const handleDeleteFlows = async (flow_id) => {
    try {
      await dispatch(fetchDeleteFlows(workspaceUtils.getID(), flow_id));
      initialState();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen">
      <div className="head items-center justify-between gap-x-10 h-12 flex">
        <div className="group flex gap-x-8">
          <h1 className="title text-2xl font-bold">Flow List</h1>
          <button
            onClick={() => handleAddFlow()}
            className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-1 flex shadow-sm items-center gap-x-3"
          >
            <FontAwesomeIcon
              icon={icon({
                name: "plus",
                style: "solid",
              })}
              className="scale-105"
            />
            <div className="text-md">Add Flow</div>
          </button>
        </div>
        <div className="action flex gap-x-5 h-full">
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
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              name="price"
              id="price"
              className="h-full w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Search..."
              ref={searchRef}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
              <p className="pr-4">
                Ctrl
                <span className="font-medium">+ K</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-gray-400 my-4" />
      <div className="rounded-lg h-full bg-gray-100 overflow-hidden">
        <table className="w-full border border-collapse rounded-md">
          <thead>
            <tr>
              <th className="bg-dark w-fit text-white p-2 border border-dark-600 text-center">
                No.
              </th>
              <th className="bg-dark text-white p-2 border border-dark-600 text-left">
                Name
              </th>
              <th className="bg-dark text-white p-2 border border-dark-600 text-left">
                Description
              </th>
              <th className="bg-dark text-white p-2 border border-dark-600 text-left">
                Path
              </th>
              <th className="bg-dark text-white p-2 border border-dark-600 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {fileterData().map((flow,index) => (
              <tr key={flow.id}>
                <td align="center" className="border border-gray-300 py-2 w-fit">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(flow.name),
                    }}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(flow.description),
                    }}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(flow.API),
                    }}
                  />
                </td>

                <td className="border border-gray-300 py-2 px-1">
                  <div className="flex justify-center gap-x-5">
                    <Link to={`/workspace/${projectName}/flows/${flow.name}`}>
                      <FontAwesomeIcon
                        icon={icon({
                          name: "pen-to-square",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                      />
                    </Link>
                    <div onClick={() => handleDeleteFlows(flow.id)}>
                      <FontAwesomeIcon
                        icon={icon({
                          name: "trash",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlowList;

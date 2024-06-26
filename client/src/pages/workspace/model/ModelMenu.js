import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import ModelMenuCard from "./ModelMenuCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetModelWorkspace } from "../../../actions/modelActions";
import workspaceUtils from "../../../utils/workspaceUtils";
import modelUtils from "../../../utils/modelUtils";

function ModelMenu() {
  const [isResized, setIsResized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [models, setModel] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const { projectName, activeModel } = useParams();

  const handleResizeClick = () => {
    setTimeout(() => {
      setIsHidden(!isHidden);
    }, 100);

    setIsResized(!isResized);
  };

  async function initState() {
    try {
      const data = await dispatch(
        fetchGetModelWorkspace(workspaceUtils.getID())
      );

      if (data.status === true) {
        setModel(data.data);
        data.data.forEach((val) => {
          if (val.name === activeModel) {
            modelUtils.setCurrent(val);
          }
        });
      } else {
        setModel([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fileterData = () => {
    return models.filter((item) => {
      const firstKeyword = searchTerm.toLowerCase().split()[0];
      return item.name?.toString().toLowerCase().includes(firstKeyword);
    });
  };

  useEffect(() => {
    initState();
  }, [location, projectName]);

  return (
    <div
      className={`h-screen bg-grey text-white pt-6 px-${
        isResized ? "0" : "6"
      } w-${
        isResized ? "5" : "72"
      } relative transition-all duration-300 ease-in-out`}
    >
      <div
        className="resize-btn cursor-pointer absolute w-2 rounded-r-lg h-fit bg-primary-700 hover:bg-primary-900 px-2 py-3 flex items-center justify-center -right-4 top-1/2 -translate-y-1/2"
        onClick={handleResizeClick}
      >
        <FontAwesomeIcon
          icon={icon({
            name: "caret-left",
            style: "solid",
          })}
          className={`transition-all duration-300 ease-in-out scale-125 ${
            isResized ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isResized ? "opacity-0" : "opacity-1"
        } ${isHidden ? "hidden" : ""}`}
      >
        <div className="title flex text-black items-center justify-between">
          <div className="text-lg font-bold">Models</div>
          <Link to={`/workspace/${projectName}/addmodel`}>
            <div className="tools cursor-pointer text-primary-900 flex items-center gap-x-2 hover:text-primary-700 hover:scale-110 duration-100">
              Add Model
              <FontAwesomeIcon
                icon={icon({
                  name: "circle-plus",
                  style: "solid",
                })}
                className="scale-125"
              />
            </div>
          </Link>
        </div>
        <hr className="my-3 border-gray-400" />
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
            className="mb-4 block w-full rounded-md border-0 py-1.5 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            placeholder="Search model here..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="list flex flex-col gap-x-5">
          {fileterData().map((val) => (
            <div key={val.id}>
              <ModelMenuCard
                allModel={fileterData()}
                data={val}
                refresh={initState}
              />
              <hr className="my-2 border-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModelMenu;

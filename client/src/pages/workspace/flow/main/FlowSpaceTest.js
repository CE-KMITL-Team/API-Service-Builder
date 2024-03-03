import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import userUtils from "../../../../utils/userUtils";
import { API_HOST } from "../../../../utils/apiPath";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetFlowDetailByName } from "../../../../actions/flowActions";

function FlowSpaceTest() {
  const [isResized, setIsResized] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const [paramData, setParam] = useState("");
  const [resData, setResData] = useState({});

  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, activeFlow } = useParams();

  const getFlowDetail = async () => {
    const response = await dispatch(fetchGetFlowDetailByName(activeFlow));

    if (response.status) {
      setPath(response.data.API);
    } else {
      if (activeFlow !== "unnamedFlow") {
        navigate(`/workspace/${projectName}/flows`);
      }
    }
  };

  useEffect(() => {
    getFlowDetail();
  }, []);

  const handleRunClick = async () => {
    try {
      let parsedParamData = "";
      if (paramData !== "") {
        parsedParamData = JSON.parse(paramData);
      }

      await axios
        .post(
          `${API_HOST.split("3200")[0]}${3200 + userUtils.getID()}${path}`,
          parsedParamData,
          {
            headers: {
              Authorization: `Bearer ${userUtils.getApiKey()}`,
            },
          }
        )
        .then((res) => {
          setResData(res);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleResizeClick = () => {
    setTimeout(() => {
      setIsHidden(!isHidden);
    }, 100);

    setIsResized(!isResized);
  };

  return (
    <div
      className={`w-full bg-grey border-gray-400 border-b-0 rounded-t-lg border text-white px-${
        isResized ? "0" : "6 pb-6 pt-2"
      } h-${
        isResized ? "0" : "72"
      } relative transition-all duration-300 ease-in-out`}
    >
      <div
        className="resize-btn cursor-pointer absolute right-24 -top-6 rounded-t-lg h-fit bg-primary-700 hover:bg-primary-900 px-4 flex items-center justify-center"
        onClick={handleResizeClick}
      >
        <span className="mr-3">Test</span>
        <FontAwesomeIcon
          icon={icon({
            name: "caret-down",
            style: "solid",
          })}
          className={`transition-all duration-300 ease-in-out scale-125 ${
            isResized ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`h-full transition-all duration-300 ease-in-out gap-y-6 ${
          isResized ? "opacity-0" : "opacity-1"
        } ${isHidden ? "hidden" : ""}`}
      >
        <div className="flex text-lg h-full gap-x-5">
          <div className="parameter flex-1 flex flex-col">
            <div className="title flex justify-between items-center mb-2">
              <label
                htmlFor="Parameter"
                className="text-md font-bold text-gray-900"
              >
                Parameter
              </label>
              <div
                onClick={handleRunClick}
                className="tools cursor-pointer text-gray-500 flex items-center gap-x-2 hover:text-primary-700 hover:scale-110 duration-100"
              >
                <div className="text">Run</div>
                <FontAwesomeIcon
                  icon={icon({
                    name: "circle-play",
                    style: "solid",
                  })}
                />
              </div>
            </div>

            <div className="group flex-1">
              <textarea
                value={paramData}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setParam(inputValue);
                  try {
                    JSON.parse(inputValue); // ลองแปลง JSON ดู ถ้ามี SyntaxError จะเกิดขึ้นที่นี่
                    setParam(inputValue);
                  } catch (error) {
                    console.error("Invalid JSON:", error);
                  }
                }}
                id="Parameter"
                className="resize-none h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="response flex-1 flex flex-col">
            <label
              htmlFor="Response"
              className="mb-2 text-md font-bold text-gray-900"
            >
              Response{" "}
              <span className="text-primary-900">
                {resData.status !== undefined
                  ? `(${resData?.status} ${resData?.statusText})`
                  : ""}
              </span>
            </label>

            <div className="group flex-1">
              <div
                disabled
                id="Response"
                className="resize-none h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <pre>{JSON.stringify(resData.data, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowSpaceTest;

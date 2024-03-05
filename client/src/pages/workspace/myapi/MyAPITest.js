import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST } from "../../../utils/apiPath";
import userUtils from "../../../utils/userUtils";

function MyAPITest({ focusValue }) {
  const [api, setApi] = useState("");
  const [paramData, setParam] = useState("");
  const [focusData, setFocusData] = useState("");
  const [resData, setResData] = useState({});

  const handleRunClick = async () => {
    try {
      let parsedParamData = "";
      if (paramData !== "") {
        parsedParamData = JSON.parse(paramData);
      }

      await axios
        .post(
          // `${API_HOST.split("3200")[0]}${3200 + userUtils.getID()}${api}`,
          `${API_HOST.split("3328")[0]}3326${api}`,
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

  useEffect(() => {
    setApi(focusData);
    setFocusData(focusValue);
  }, [focusData, focusValue]);

  return (
    <div className="test-section h-full flex flex-col">
      <div className="group">
        <div className="title flex gap-x-3 w-full items-center">
          <div className=" text-xl">
            <FontAwesomeIcon
              icon={icon({
                name: "bug",
                style: "solid",
              })}
              className="text-lg w-8"
            />
          </div>
          <h1 className=" text-2xl font-bold">Test</h1>
        </div>
        <div className="group w-full mt-4">
          <label
            htmlFor="api-path"
            className="block mb-1 text-md text-gray-900 font-bold"
          >
            API Path
          </label>
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            // onChange={onChangData}
            id="api-path"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="value"
            required
          />
        </div>
        <button
          className="bg-primary-900 text-white hover:bg-primary-800 rounded-md py-2 text-lg shadow-md px-8 w-fit mt-3 max-w-lg flex items-center gap-x-3"
          onClick={handleRunClick}
        >
          <FontAwesomeIcon
            icon={icon({
              name: "play",
              style: "solid",
            })}
            className="text-lg"
          />
          <div className="text-md">Run</div>
        </button>
        <hr className="mb-3 mt-5 border-solid border-t-2 border-gray-400" />
      </div>
      <div className="flex flex-col h-full">
        <label
          htmlFor="Parameter"
          className="mb-2 text-md font-bold text-gray-900"
        >
          Parameter
        </label>

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
        <hr className="mb-3 mt-5 border-solid border-t-2 border-gray-400" />
        <label
          htmlFor="Response"
          className="mb-2 text-md font-bold text-gray-900"
        >
          Response:{" "}
          <span className="text-primary-900">
            {resData.status !== undefined
              ? `(${resData?.status} ${resData?.statusText})`
              : ""}
          </span>
        </label>
        <div className="group flex-1">
          <div
            id="Response"
            className="resize-none h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <pre className="text-balance h-[32vh] overflow-auto">
              {JSON.stringify(resData.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAPITest;

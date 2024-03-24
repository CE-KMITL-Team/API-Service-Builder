import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import userUtils from "../../../utils/userUtils";
import { useDispatch } from "react-redux";
import { fetchGetFlows } from "../../../actions/flowActions";
import workspaceUtils from "../../../utils/workspaceUtils";

function WorkspaceMenuPopup({ isOpen, onRequestClose }) {
  const inputRefToken = useRef(null);
  const inputRefAPI = useRef(null);
  const dispatch = useDispatch();

  const handleCopyClickAPI = () => {
    inputRefAPI.current.select();
    document.execCommand("copy");
  };
  const handleCopyClickToken = () => {
    inputRefToken.current.select();
    document.execCommand("copy");
  };

  const [flowLists, setFlowlist] = useState([]);
  async function initialState() {
    try {
      setTimeout(async () => {
        const data = await dispatch(fetchGetFlows(workspaceUtils.getID()));

        if (data.status === true) {
          setFlowlist(data.data);
        } else {
          setFlowlist([]);
        }
      }, 50);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    initialState();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="z-50 fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      className="z-50 bg-white w-1/3 p-6 rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div className="flex justify-between">
        <h1 className="text-xl text-black font-bold">Your Bearer Token</h1>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon
            icon={icon({
              name: "times",
              style: "solid",
            })}
          />
        </button>
      </div>
      <div className="relative rounded-md h-full shadow-md">
        <input
          ref={inputRefAPI}
          type="text"
          className="mt-2 mb-2 h-full block w-full rounded-md border-0 py-2.5 px-2.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          value={userUtils.getApiKey()}
          required
          readOnly // Make the input read-only to prevent editing
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center text-gray-500">
          <button
            className="p-4 text-gray-600 hover:text-black duration-100"
            onClick={handleCopyClickAPI}
          >
            <FontAwesomeIcon
              icon={icon({
                name: "copy",
                style: "regular",
              })}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="text-xl text-black font-bold">API Path</h1>
      </div>
      <div className="relative rounded-md h-full shadow-md">
        <input
          ref={inputRefToken}
          type="text"
          className="mt-2 mb-2 h-full block w-full rounded-md border-0 py-2.5 px-2.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          value={'http://localhost:3200/'}
          required
          readOnly // Make the input read-only to prevent editing
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center text-gray-500">
          <button
            className="p-4 text-gray-600 hover:text-black duration-100"
            onClick={handleCopyClickToken}
          >
            <FontAwesomeIcon
              icon={icon({
                name: "copy",
                style: "regular",
              })}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <h1 className="text-xl text-black font-bold">Your API</h1>
      </div>
      <div className="flex justify-between">
        <div className="list mt-3 flex flex-col gap-y-3 w-full text-sm">
          {flowLists.length !== 0 ? (
            flowLists.map((val) => (
              <div className="border border-gray-500 text-white w-full rounded-lg p-3 px-5 flex justify-between">
                <div className="path text-black">{val.API}</div>
                <div className="path text-gray-400">{val.description}</div>
              </div>
            ))
          ) : (
            <div className="ml-11 text-gray-700">
              You need to create api first . . .
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default WorkspaceMenuPopup;

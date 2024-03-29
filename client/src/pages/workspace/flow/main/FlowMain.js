import React, { useState } from "react";
import FlowStartPopup from "./FlowStartPopup";
import FlowNodeFrame from "./nodes/FlowNodeFrame";
import FlowSpace from "./FlowSpace";
import FlowPropertyFrame from "./properties/FlowPropertyFrame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ReactFlowProvider } from "reactflow";
import { useParams } from "react-router-dom";

function FlowMain() {
  const { projectName, activeFlow } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(activeFlow === "unnamedFlow");

  const [toggleHidden, setToggleHidden] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FlowStartPopup isOpen={isPopupOpen} onRequestClose={closePopup} />
      <div className="flex w-full">
        <ReactFlowProvider>
          <div>
            <FlowNodeFrame />
          </div>
          <div className="flex-1">
            <FlowSpace />
          </div>
          <div className="relative">
            <FlowPropertyFrame toggleHidden={toggleHidden} />
            <div
              className="hidden resize-btn cursor-pointer absolute w-2 rounded-l-lg h-fit bg-primary-700 hover:bg-primary-900 px-2 py-3 flex items-center justify-center -left-4 top-1/2 -translate-y-1/2"
              // onClick={handleResizeClick}
            >
              <FontAwesomeIcon
                icon={icon({
                  name: "caret-right",
                  style: "solid",
                })}
                className={`transition-all duration-300 ease-in-out scale-125 text-white ${
                  !toggleHidden ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </DndProvider>
  );
}

export default FlowMain;

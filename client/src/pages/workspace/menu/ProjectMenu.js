import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetWorkspace } from "../../../actions/workspaceActions";
import MenuFooter from "./MenuFooter";

function ProjectMenu() {
  const [projects, setProjects] = useState([]);
  const [setDropdownOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const dispatch = useDispatch();

  async function initState() {
    try {
      dispatch(fetchGetWorkspace()).then((val) => {
        if (val !== false) {
          setProjects(val);
        } else {
          setProjects([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initState();
    document.addEventListener("click", closeManu);
    return () => {
      document.removeEventListener("click", closeManu);
    };
  }, []);

  const closeManu = (event) => {
    if (
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="h-screen bg-dark text-white pt-6 pl-10 pr-10 w-72 relative">
      <div className="title flex items-center justify-center">
        <img
          className="h-6 w-auto"
          src="/assets/icon-white.png"
          alt="API Forge"
        />
        <div className="text-md font-bold ml-4">API Forge</div>
      </div>
      <div className="menu mt-8 flex flex-col gap-y-2">
        <div className="items flex text-primary-700 items-center gap-x-2 relative">
          <FontAwesomeIcon
            icon={icon({
              name: "square-plus",
              style: "regular",
            })}
            className="text-lg w-8"
          />
          <div className="text-lg after:content-[''] after:absolute after:w-2 after:rounded-l after:h-full after:bg-primary-700 after:-right-10 after:mb-5">
            Create Project
          </div>
        </div>
      </div>
      <div className="text-xl font-bold text-gray-400 mt-12">Project</div>
      <div className="menu mt-4 flex flex-col gap-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`items flex text-${
              project.isOnline ? "lime-400" : "red-400"
            } hover:text-${project.isOnline ? "lime-500" : "red-500"}`}
          >
            <Link
              to={`/workspace/${project.id}/myapi`}
              className="flex items-center cursor-pointer gap-x-2"
            >
              <FontAwesomeIcon
                icon={icon({
                  name: "circle",
                  style: "solid",
                })}
                className="scale-50 w-8"
              />
              <div className="text-lg text-gray-400 hover:text-gray-300">
                {project.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <MenuFooter></MenuFooter>
    </div>
  );
}

export default ProjectMenu;

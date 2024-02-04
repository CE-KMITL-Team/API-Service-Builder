import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../../actions/authActions";

import { fetchGetWorkspace } from "../../../actions/workspaceActions";

import Dropdown from "../../../components/Dropdown";

function ProjectMenu() {
  const [projects, setProjects] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const navigate = useNavigate();
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

  function onLogout() {
    dispatch(fetchLogout());
    navigate("/Login");
  }

  const closeManu = (event) => {
    if (
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  const menuItems = [
    { label: "Edit Profile", link: "/edit-profile" },
    { label: "Logout", link: () => onLogout() },
  ];

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
        <div className="items flex text-gray-400 items-center cursor-pointer gap-x-2 hover:text-gray-200">
          <FontAwesomeIcon
            icon={icon({
              name: "right-from-bracket",
              style: "solid",
            })}
            className="text-lg w-8"
          />
          <div className="text-lg" onClick={() => onLogout()}>
            Logout
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
							to={`/workspace/${project.name}/myapi`}
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
      {/* <Dropdown menu={menuItems} />; */}
      <div className="setting absolute bottom-3 right-3 cursor-pointer">
        <Dropdown menu={menuItems} direction="top" background="">
          <FontAwesomeIcon
            icon={icon({
              name: "gear",
              style: "solid",
            })}
            className="text-lg w-8 text-gray-500"
          />
        </Dropdown>
      </div>
    </div>
  );
}

export default ProjectMenu;

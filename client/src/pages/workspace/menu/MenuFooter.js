import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../../components/Dropdown";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../../../actions/authActions";
import { useDispatch } from "react-redux";

function MenuFooter() {
  const menuItems = [
    // {
    //   label: (
    //     <>
    //       <FontAwesomeIcon
    //         icon={icon({
    //           name: "gear",
    //           style: "solid",
    //         })}
    //         className="text-lg w-8 text-gray-500"
    //       />
    //       Edit Profile
    //     </>
    //   ),
    //   link: "/edit-profile",
    // },
    {
      label: (
        <>
          <FontAwesomeIcon
            icon={icon({ name: "backward", style: "solid" })}
            className="text-lg w-8 text-gray-500"
          />
          Back to workspace
        </>
      ),
      link: "/workspace",
    },
    {
      label: (
        <>
          <FontAwesomeIcon
            icon={icon({ name: "right-from-bracket", style: "solid" })}
            className="text-lg w-8 text-gray-500"
          />
          Logout
        </>
      ),
      link: () => onLogout(),
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(fetchLogout());
    navigate("/Login");
  }

  return (
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
  );
}

export default MenuFooter;

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

// Update the function to accept a 'menu' prop
function Dropdown({ menu, children, direction = "down" }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu>
      <Menu.Button
        className={`inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
      >
        {children}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            direction === "top" ? "-top-2 transform -translate-y-full" : "mt-2"
          } `}
        >
          {menu.map((link) => (
            <Menu.Item
              as="a"
              key={link.link}
              href={
                link.link && typeof link.link === "string"
                  ? link.link
                  : undefined
              }
              className="ui-active:text-black ui-not-active:text-black"
            >
              <button
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm color-black ui-active:bg-grey`}
                onClick={
                  typeof link.link === "function" ? link.link : undefined
                }
              >
                {link.label}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;

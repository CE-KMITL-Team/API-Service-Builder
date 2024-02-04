// import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function Setting({ menu }) {
  function classMenu(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bottom-7">
            {menu.map((menuItem, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href={menuItem.link}
                    className={classMenu(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {menuItem.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Setting;

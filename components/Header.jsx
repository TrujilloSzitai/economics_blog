import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Transition } from "@headlessui/react";

/* Navbar promedio */

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <nav className="w-full mx-auto px-4 md:px-10 mb-8 bg-white shadow-xl z-50">
      <div className="w-full py-4 flex justify-between">
        <div className="float-left block">
          <Link href="/">
            <div className="flex items-center">
              <div className="cursor-pointer logo-on-hover"></div>
              <span
                className=" text-2xl md:text-4xl md:m-0 cursor-pointer font-bold text-black fill-on-hover"
                data-text="Eaglance"
              >
                Eaglance
              </span>
            </div>
          </Link>
        </div>
        <div className="float-right hidden md:flex items-center">
          <Link href="/about" className="float-right rounded-lg">
            <span className=" md:text-xl text-gray-700 hover:text-black text-base mx-4 cursor-pointer">
              Acerca de
            </span>
          </Link>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            className="rounded-lg float-right"
            onClick={handleClick}
          >
            <span className=" md:text-xl text-gray-700 hover:text-black text-base mx-4 cursor-pointer">
              Categorías
            </span>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                selected={category === "Pyxis"}
                onClick={handleClose}
                key={category.name}
              >
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="hover:bg-gray-300 text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-end"
              >
                Acerca de
              </a>

              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                className="rounded-lg justify-end w-full"
                onClick={handleClick}
              >
                <span className=" md:text-xl text-gray-700 hover:text-black text-base mx-4 cursor-pointer">
                  Categorías
                </span>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                    left: '50%'
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem
                    selected={category === "Pyxis"}
                    onClick={handleClose}
                    key={category.name}
                  >
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Header;

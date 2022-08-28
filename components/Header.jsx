import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/* Navbar promedio */

const Header = () => {
  const [categories, setCategories] = useState([]);

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
    <div className="w-full mx-auto px-10 mb-8 bg-white shadow-xl z-50">
      <div className="w-full py-4 flex justify-between">
        <div className="float-left block">
          <Link href="/">
            <div className="flex items-center">
              <div className="cursor-pointer logo-on-hover"></div>
{/*               <img
                src="/assets/img/icon.svg"
                width="64px"
                height="64px"
                className="cursor-pointer logo-on-hover"
              /> */}
              <span className="md:text-4xl cursor-pointer font-bold text-2xl text-black fill-on-hover" data-text='Wilde'>
                Wilde
              </span>
            </div>
          </Link>
        </div>
        <div className="float-right contents items-center">
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
              <MenuItem selected={category === "Pyxis"} onClick={handleClose}>
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
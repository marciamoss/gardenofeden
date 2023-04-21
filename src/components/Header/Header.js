import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuDropDown from "../Menu/MenuDropDown";
import { authDataInfo } from "../../store";
import { useEmailLinkCompleteQuery } from "../../store";
import { ImMenu } from "react-icons/im";
import { GoChevronDown } from "react-icons/go";
import { Menu } from "@headlessui/react";
import ActionPopups from "../ActionPopups/ActionPopups";

const logo = require(`../../images/tree-earth.png`);

const Header = () => {
  const dispatch = useDispatch();
  const { signedIn, showMenu } = useSelector((state) => state.authData);

  useEmailLinkCompleteQuery({ signedIn });

  return (
    <nav className="py-3 px-5 w-full bg-black">
      <div className="flex justify-between items-center container mx-auto bg-black">
        <div className="float-left">
          <button
            onClick={() => dispatch(authDataInfo({ showProfile: false }))}
          >
            <img
              className="h-7 w-7 float-left max-[640px]:h-5 max-[640px]:w-5 max-[280px]:h-4 max-[280px]:w-4"
              src={logo}
              alt="Tree menu-icon"
            />
            <h1 className="max-[640px]:text-sm text-lg text-zinc-50 font-bold float-left ml-1 max-[280px]:text-xs">
              Garden Of Eden
            </h1>
          </button>
        </div>

        <div className="text-right">
          <Menu
            as="div"
            className="relative inline-block text-left float-right z-10"
          >
            <div>
              <Menu.Button
                onClick={() => dispatch(authDataInfo({ showMenu: true }))}
                className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <ImMenu className="text-lg font-bold max-[640px]:text-sm max-[280px]:text-xs" />
                <GoChevronDown />
              </Menu.Button>
            </div>
            {showMenu ? <MenuDropDown className="text-right z-40" /> : ""}
          </Menu>
        </div>
        <ActionPopups />
      </div>
    </nav>
  );
};

export default Header;

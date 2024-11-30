import React from "react";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { userData, logout } = useAuthStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {userData ? (
              <Link
                to="/home"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">LetsChat</h1>
              </Link>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-[18px] xs:text-lg font-bold">LetsChat</h1>
              </Link>
            )}
          </div>

          <div className="hidden xs:flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {userData && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
          <div className="xs:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              More
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-3"
            >
              <li>
                <Link
                  to={"/settings"}
                  className={`
              btn btn-sm gap-2 transition-colors
              
              `}
                >
                  <Settings className="w-4 h-4" />
                  <span className="">Settings</span>
                </Link>
              </li>
              {userData && (
                <li>
                  <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                    <User className="size-5" />
                    <span className="">Profile</span>
                  </Link>
                </li>
              )}
              {userData && (
                <li>
                  <button className="btn btn-sm gap-2" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="">Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

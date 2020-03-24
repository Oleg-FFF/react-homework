import React from "react";
import {
  NavLink
} from "react-router-dom";

import { AppConfigContext, UserContext } from "../../context";
import UserInfo from "../UserInfo/UserInfo";
import "./Header.scss";

const Header = () => {
  return (
    <AppConfigContext.Consumer>
      {allLinks => (
        <UserContext.Consumer>
          {({ user }) => (
            <div className="header">
              <ul className="menu">
                {" "}
                {user &&
                  allLinks &&
                  allLinks[user.role].map(link => (
                    <NavLink to={link.to} key={link.label} activeClassName="active-link">{link.label}</NavLink>
                  ))}
              </ul>
              <UserInfo />
            </div>
          )}
        </UserContext.Consumer>
      )}
    </AppConfigContext.Consumer>
  );
};

export default Header;
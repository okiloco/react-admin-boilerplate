import React, { Component } from "react";
import PropTypes from "prop-types";
import SubMenu from "./subMenu";
import { MenuItemLink, Responsive, DashboardMenuItem } from "react-admin";
import { Icon } from "antd";

import { Category, BubbleChart, FormatAlignJustify } from "@material-ui/icons";

import routes from "../routes.js";

const Demo = () => <div>Hola</div>;
export default class Menu extends Component {
  state = {
    config: false,
    wiki: false,
    express: false,
    pedidos: false,
    users: false,
  };

  static propTypes = {
    onMenuClick: PropTypes.func,
    logout: PropTypes.object,
  };

  handleToggle = (menu) => {
    this.setState((state) => ({ [menu]: !state[menu] }));
  };

  render() {
    const { onMenuClick, logout } = this.props;
    return (
      <>
        {
          routes.map(({ menu }) => (menu && <MenuItemLink
            className={"menuItems"}
            to={menu.path}
            primaryText={menu.primaryText}
            onClick={onMenuClick}
          /* leftIcon={<Icon type="user-add" />} */
          />))
        }

      </>
    );
  }
}

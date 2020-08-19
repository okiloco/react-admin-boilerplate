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
  getItems = (items) => {
    const { onMenuClick, logout } = this.props;

    const handleOnClick = (e, menu) => {
      if (onMenuClick) onMenuClick(e);
    }


    return items.map((menu, index) => {
      if (!menu) return null;
      if (!menu.path && !menu.children) return null;
      if (typeof menu.children != "undefined") {
        return <SubMenu
          key={menu.name || `item_${index}`}
          name={menu.primaryText}
          onClick={onMenuClick}
          icon={typeof menu.icon == "string" ? <Icon type={menu.icon} /> : menu.icon}
          handleToggle={() => this.handleToggle(menu.name || `item_${index}`)}
          isOpen={this.state[menu.name || `item_${index}`]}
        >
          {this.getItems(menu.children)}
        </SubMenu>
      }
      return <MenuItemLink
        key={menu.name || `item_${index}`}
        className={"menuItems"}
        to={menu.path}
        leftIcon={typeof menu.icon == "string" ? <Icon type={menu.icon} /> : menu.icon}
        primaryText={menu.primaryText}
        onClick={onMenuClick}
      />
    })
  }
  render() {
    const { onMenuClick, logout } = this.props;
    return (
      <>
        {
          this.getItems(routes)
        }
      </>
    );
  }
}

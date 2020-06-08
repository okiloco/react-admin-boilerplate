import React, { Component } from "react";
import { Layout, Sidebar } from "react-admin";
import AppBar from "../components/appBar";
import Menu from "../components/Menu";
const CustomSidebar = props => (
  <Sidebar {...props} size={200} className={"sidebar"} />
);
export default class CustomLayout extends Component {
  render() {
    return (
      <Layout
        {...this.props}
        appBar={AppBar}
        sidebar={CustomSidebar}
        menu={Menu}
      />
    );
  }
}

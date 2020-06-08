import React from "react";
import { AppBar, UserMenu, translate } from "react-admin";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components"
// import Logo from './logo';
const Logo = styled.img`
  max-width: 80px;
  height: auto;
`
const styles = {
  title: {
    flex: 1,
    fontSize: 18,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: .1
  }
};

const CustomUserMenu = translate(({ translate, ...props }) => (
  <UserMenu {...props}>
    {/* <MenuItemLink
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
        /> */}
  </UserMenu>
));

const CustomAppBar = ({ classes, ...props }) => (
  <AppBar className="appBar" {...props} userMenu={<CustomUserMenu />}>
    {<Logo src={"/logo.png"} />}
    <span className={classes.spacer} />
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
  </AppBar>
);

export default withStyles(styles)(CustomAppBar);

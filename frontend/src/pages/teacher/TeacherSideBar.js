import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SidebarContainer = styled.div`
  color: #1f294d;
  width: 250px;
  height: 100%;
  padding-top: 2px;
  //   display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SidebarUser = styled.div`
  margin-top: 59vh;

  //   display: flex;
  //   flex-direction: column;
  //   position: absolute;
  //   padding-bottom: 17px;
`;

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const sclassName = currentUser.teachSclass;

  const location = useLocation();
  return (
    <>
      <SidebarContainer>
        <React.Fragment>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === ("/" || "/Teacher/dashboard")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Teacher/class">
            <ListItemIcon>
              <ClassOutlinedIcon
                color={
                  location.pathname.startsWith("/Teacher/class")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary={`Class ${sclassName.sclassName}`} />
          </ListItemButton>
          <ListItemButton component={Link} to="/Teacher/studyMaterial">
            <ListItemIcon>
              <AnnouncementOutlinedIcon
                color={
                  location.pathname.startsWith("/Teacher/studyMaterial")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Study Material" />
          </ListItemButton>
        </React.Fragment>
        <Divider sx={{ my: 1 }} />
        <SidebarUser>
          <React.Fragment>
            {/* <ListSubheader component="div" inset>
                    User
                </ListSubheader> */}
            <ListItemButton component={Link} to="/Teacher/profile">
              <ListItemIcon>
                <AccountCircleOutlinedIcon
                  color={
                    location.pathname.startsWith("/Teacher/profile")
                      ? "primary"
                      : "inherit"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton component={Link} to="/logout">
              <ListItemIcon>
                <ExitToAppIcon
                  color={
                    location.pathname.startsWith("/logout")
                      ? "primary"
                      : "inherit"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </React.Fragment>
        </SidebarUser>
      </SidebarContainer>
    </>
  );
};

export default TeacherSideBar;

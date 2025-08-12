import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReportIcon from "@mui/icons-material/Report";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
  margin-top: 30vh;

  //   display: flex;
  //   flex-direction: column;
  //   position: absolute;
  //   padding-bottom: 17px;
`;
const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <SidebarContainer>
        <React.Fragment>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === ("/" || "/Admin/dashboard")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/classes">
            <ListItemIcon>
              <ClassOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/classes")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/subjects">
            <ListItemIcon>
              <AssignmentIcon
                color={
                  location.pathname.startsWith("/Admin/subjects")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Subjects" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/teachers">
            <ListItemIcon>
              <SupervisorAccountOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/teachers")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Teachers" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/students">
            <ListItemIcon>
              <PersonOutlineIcon
                color={
                  location.pathname.startsWith("/Admin/students")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/notices">
            <ListItemIcon>
              <AnnouncementOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/notices")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Notices" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/complains">
            <ListItemIcon>
              <ReportIcon
                color={
                  location.pathname.startsWith("/Admin/complains")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemButton>
        </React.Fragment>
        <Divider sx={{ my: 1 }} />
        <SidebarUser>
          <ListItemButton component={Link} to="/Admin/profile">
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/profile")
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
        </SidebarUser>
      </SidebarContainer>
    </>
  );
};

export default SideBar;

import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SidebarContainer = styled.div`
  color: #1f294d;
  width: 250px;
  height: 100%;
  padding-top: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SidebarUser = styled.div`
  margin-top: 50vh;

  //   display: flex;
  //   flex-direction: column;
  //   position: absolute;
  //   padding-bottom: 17px;
`;

const StudentSideBar = () => {
  const location = useLocation();
  return (
    <>
      <SidebarContainer>
        <React.Fragment>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === ("/" || "/Student/dashboard")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Student/subjects">
            <ListItemIcon>
              <AssignmentIcon
                color={
                  location.pathname.startsWith("/Student/subjects")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Subjects" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Student/attendance">
            <ListItemIcon>
              <ClassOutlinedIcon
                color={
                  location.pathname.startsWith("/Student/attendance")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Student/complain">
            <ListItemIcon>
              <AnnouncementOutlinedIcon
                color={
                  location.pathname.startsWith("/Student/complain")
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
          <React.Fragment>
            <ListItemButton component={Link} to="/Student/profile">
              <ListItemIcon>
                <AccountCircleOutlinedIcon
                  color={
                    location.pathname.startsWith("/Student/profile")
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

export default StudentSideBar;

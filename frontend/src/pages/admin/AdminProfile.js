import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="Admin Avatar"
                sx={{ width: 150, height: 150, fontSize: "64px" }}>
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h2" textAlign="center">
                {currentUser.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                Admin Email:{currentUser.email}
              </Typography>
            </Box>
          </Grid>
          {/* Additional personal information */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                Phone: 9012345678{currentUser.phone}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center">
                Address: {" Mumbai"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            {/* Include additional information as needed */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong>{" "}
                {currentUser.dateOfBirth || "28/02/2002"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> {currentUser.gender || "Male"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 40px;
`;

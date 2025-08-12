// TeacherProfile.js
import React from 'react';
import styled from 'styled-components';
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
import { useSelector, useDispatch } from 'react-redux';
import { setTeacherID } from '../../redux/teacherRelated/setTeacherId';
import { useEffect } from "react";


const TeacherProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);
  
  if (response) { console.log(response) }
  else if (error) { console.log(error) }
  
 // const teacherID = currentUser._id; // Assuming the teacher ID is stored in the currentUser objects
  useEffect(() => {
      if (currentUser && currentUser._id) {
        dispatch(setTeacherID(currentUser._id));
      }
  }, [dispatch, currentUser]);

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="Student Avatar"
                  sx={{ width: 150, height: 150, fontSize: "64px" }}
                >
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
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Email: {currentUser.email}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Class: {teachSclass.sclassName}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Subject: {teachSubject.subName}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  School: {teachSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Date of Birth:</strong> January 1, 2000
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Gender:</strong> Male
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Email:</strong> john.doe@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Phone:</strong> (123) 456-7890
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Address:</strong> 123 Main Street, City, Country
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Emergency Contact:</strong> (987) 654-3210
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TeacherProfile;

const StyledPaper = styled(Paper)`
  margin-top:30px;
  padding: 20px;
  margin-bottom: 20px;
`;
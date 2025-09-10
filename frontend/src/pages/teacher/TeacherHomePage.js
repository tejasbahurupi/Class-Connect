import { Container, Grid, Paper } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import styled from "styled-components";
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";

import {
  getClassStudents,
  getSubjectDetails,
} from "../../redux/sclassRelated/sclassHandle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const TeacherHomePage = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents ? sclassStudents.length : 0;
  const numberOfSessions = subjectDetails ? subjectDetails.sessions : 0;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Class Students</Title>
              {sclassStudents && (
                <Data start={0} end={numberOfStudents} duration={2.5} />
              )}
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Lessons} alt="Lessons" />
              <Title>Total Lessons</Title>
              {subjectDetails.sessions && (
                <Data start={0} end={numberOfSessions} duration={5} />
              )}
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Tests} alt="Tests" />
              <Title>Tests Taken</Title>
              <Data start={0} end={24} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Time} alt="Time" />
              <Title>Total Hours</Title>
              <Data start={0} end={30} duration={4} suffix="hrs" />{" "}
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s ease;
  border-radius: 90px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.p`
  font-size: 1.3rem;
  margin-bottom: 3px;
  font-weight: bold;
  color: #333;
`;

const Data = styled(CountUp)`
  font-size: calc(
    1.2rem + 0.6vw
  ); /* Adjust the base font size and scaling factor as needed */
`;

export default TeacherHomePage;

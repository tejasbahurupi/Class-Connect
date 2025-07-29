import { Container, Grid, Paper } from '@mui/material'
import styled from 'styled-components';
import CountUp from 'react-countup';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
      <>
        <Container maxWidth="lg" sx={{ mt: 4.5, mb: 4.5 }}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={4} lg={4} sx={{ marginTop: "40px", borderRadius: "40px"}}>
              <StyledPaper>
                <img src={Students} alt="Students" />
                <Title>Total Students</Title>
                <Data start={0} end={numberOfStudents} duration={2.5} />
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4} lg={4} sx={{ marginTop: "40px" }}>
              <StyledPaper>
                <img src={Classes} alt="Classes" />
                <Title> Age Groups</Title>
                <Data start={0} end={numberOfClasses} duration={5} />
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4} lg={4} sx={{ marginTop: "40px" }}>
              <StyledPaper>
                <img src={Teachers} alt="Teachers" />
                <Title>Total Teachers</Title>
                <Data start={0} end={numberOfTeachers} duration={2.5} />
              </StyledPaper>
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
    background-color: #e3c85f;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1)
  }

  
`;

const Title = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3px;
  font-weight: bold;
  color: #333;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default AdminHomePage
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
  Container,
  Tab,
  IconButton,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { PurpleButton } from "../../components/buttonStyles";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { updateStudentFields } from "../../redux/studentRelated/studentHandle";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { removeStuff } from "../../redux/studentRelated/studentHandle";
import CustomBarChart from "../../components/CustomBarChart";

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  //
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  //

  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  //
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress)).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const deleteHandler = () => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };
  const removeSubAttendance = (subId) => {
    dispatch(
      updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten")
    ).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const [selectedSection, setSelectedSection] = useState("table");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const StudentDetailsAndAttendanceSection = () => {
    const renderDetailsSection = () => {
      return (
        <div>
          {/* ll  */}
          Name: {userDetails.name}
          <br />
          Roll Number: {userDetails.rollNum}
          <br />
          Class: {sclassName.sclassName}
          <br />
          School: {studentSchool.schoolName}
          <br />
          <br />
          <h3>Attendance:</h3>
          {subjectAttendance &&
            Array.isArray(subjectAttendance) &&
            subjectAttendance.length > 0 && (
              <>
                {Object.entries(
                  groupAttendanceBySubject(subjectAttendance)
                ).map(
                  ([subName, { present, allData, subId, sessions }], index) => {
                    if (subName === teachSubject) {
                      const subjectAttendancePercentage =
                        calculateSubjectAttendancePercentage(present, sessions);

                      return (
                        <Table key={index}>
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell>Subject</StyledTableCell>
                              <StyledTableCell>Present</StyledTableCell>
                              <StyledTableCell>Total Sessions</StyledTableCell>
                              <StyledTableCell>
                                Attendance Percentage
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Actions
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableHead>

                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell>{subName}</StyledTableCell>
                              <StyledTableCell>{present}</StyledTableCell>
                              <StyledTableCell>{sessions}</StyledTableCell>
                              <StyledTableCell>
                                {subjectAttendancePercentage}%
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Button
                                  variant="contained"
                                  onClick={() => handleOpen(subId)}>
                                  {openStates[subId] ? (
                                    <KeyboardArrowUp />
                                  ) : (
                                    <KeyboardArrowDown />
                                  )}
                                  Details
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                colSpan={6}>
                                <Collapse
                                  in={openStates[subId]}
                                  timeout="auto"
                                  unmountOnExit>
                                  <Box sx={{ margin: 1 }}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      component="div">
                                      Attendance Details
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                      <TableHead>
                                        <StyledTableRow>
                                          <StyledTableCell>
                                            Date
                                          </StyledTableCell>
                                          <StyledTableCell align="right">
                                            Status
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      </TableHead>
                                      <TableBody>
                                        {allData.map((data, index) => {
                                          const date = new Date(data.date);
                                          const dateString =
                                            date.toString() !== "Invalid Date"
                                              ? date
                                                  .toISOString()
                                                  .substring(0, 10)
                                              : "Invalid Date";
                                          return (
                                            <StyledTableRow key={index}>
                                              <StyledTableCell
                                                component="th"
                                                scope="row">
                                                {dateString}
                                              </StyledTableCell>
                                              <StyledTableCell align="right">
                                                {data.status}
                                              </StyledTableCell>
                                            </StyledTableRow>
                                          );
                                        })}
                                      </TableBody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
                <div>
                  Overall Attendance Percentage:{" "}
                  {overallAttendancePercentage.toFixed(2)}%
                </div>

                <CustomPieChart data={chartData} />
              </>
            )}
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
              )
            }>
            Add Attendance
          </Button>
          <br />
          <br />
          <br />
        </div>
      );
    };
    console.log("teachSubjectID:", teachSubjectID);
    console.log("subjectAttendance:", subjectAttendance);

    const renderAttendanceSection = () => {
      return <></>;
    };

    return (
      <>
        {renderDetailsSection()}
        {renderAttendanceSection()}
      </>
    );
  };
  //

  const StudentMarksSection = () => {
    const renderTableSection = () => {
      // const filteredSubjectMarks= subjectMarks.filter(mark=> mark.subName.subName===teachSubject)
      const filteredSubjectMarks = subjectMarks.filter(
        (mark) => mark.subName.subName === teachSubject
      );

      return (
        <>
          <h3>Subject Marks:</h3>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredSubjectMarks.map((result, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{result.subName.subName}</StyledTableCell>
                  <StyledTableCell>{result.marksObtained}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <PurpleButton
            variant="contained"
            onClick={() =>
              navigate(
                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
              )
            }>
            Add Marks
          </PurpleButton>
        </>
      );
    };

    // Other code remains unch

    const renderChartSection = () => {
      // Filter subjectMarks based on the subject taught by the current teacher
      const filteredSubjectMarks = subjectMarks.filter(
        (mark) => mark.subName.subName === teachSubject
      );

      return (
        <>
          <CustomBarChart
            chartData={filteredSubjectMarks}
            dataKey="marksObtained"
          />
        </>
      );
    };

    return (
      <Container>
        {subjectMarks &&
        Array.isArray(subjectMarks) &&
        subjectMarks.length > 0 ? (
          <>
            {selectedSection === "table" && renderTableSection()}
            {selectedSection === "chart" && renderChartSection()}

            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}>
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels>
                <BottomNavigationAction
                  label="Table"
                  value="table"
                  icon={
                    selectedSection === "table" ? (
                      <TableChartIcon />
                    ) : (
                      <TableChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="Chart"
                  value="chart"
                  icon={
                    selectedSection === "chart" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        ) : null}
      </Container>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <div>
          <Box sx={{ width: "100%", typography: "body1", height: "20px" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    position: "fixed",
                    width: "100%",
                    bgcolor: "background.paper",
                    zIndex: 1,
                  }}>
                  <Tab label="Attendance Details" value="1" />
                  <Tab label="Marks" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <StudentDetailsAndAttendanceSection />
                </TabPanel>
                <TabPanel value="2">
                  <StudentMarksSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </div>
      )}
    </>
  );
};

export default TeacherViewStudent;

const styles = {
  attendanceButton: {
    marginLeft: "20px",
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
  },
  styledButton: {
    margin: "20px",
    backgroundColor: "#02250b",
    "&:hover": {
      backgroundColor: "#106312",
    },
  },
};

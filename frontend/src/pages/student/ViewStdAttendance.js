import { useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";

import CustomBarChart from "../../components/CustomBarChart";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import CustomPieChart from "../../components/CustomPieChart";
import styled from "styled-components";

const ViewStdAttendance = () => {
  const dispatch = useDispatch();

  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);

  const subjectData = Object.entries(attendanceBySubject).map(
    ([subName, { subCode, present, sessions }]) => {
      const subjectAttendancePercentage = calculateSubjectAttendancePercentage(
        present,
        sessions
      );
      return {
        subject: subName,
        attendancePercentage: subjectAttendancePercentage,
        totalClasses: sessions,
        attendedClasses: present,
      };
    }
  );

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  //const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];
  const renderTableSection = () => {
    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Attendance
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Present</StyledTableCell>
              <StyledTableCell>Total Sessions</StyledTableCell>
              <StyledTableCell>Attendance Percentage</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {Object.entries(attendanceBySubject).map(
            ([subName, { present, allData, subId, sessions }], index) => {
              const subjectAttendancePercentage =
                calculateSubjectAttendancePercentage(present, sessions);

              return (
                <TableBody key={index}>
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
                          <Typography variant="h6" gutterBottom component="div">
                            Attendance Details
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell>Date</StyledTableCell>
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
                                    ? date.toISOString().substring(0, 10)
                                    : "Invalid Date";
                                return (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
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
              );
            }
          )}
        </Table>
        <div>
          Overall Attendance Percentage:{" "}
          {overallAttendancePercentage.toFixed(2)}%
        </div>
        <br />
        <br />

        <br />
        <br />
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          style={{ marginLeft: 25 }}>
          Attendance Percentage
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <div>
          <ChartContainer>
            {response ? (
              <Typography variant="h6">No Attendance Found</Typography>
            ) : (
              <>
                {loading ? (
                  <Typography variant="h6">Loading...</Typography>
                ) : (
                  <>
                    {subjectAttendance &&
                    Array.isArray(subjectAttendance) &&
                    subjectAttendance.length > 0 ? (
                      <>
                        <CustomPieChart data={chartData} />
                      </>
                    ) : (
                      <Typography variant="h6">No Attendance Found</Typography>
                    )}
                  </>
                )}
              </>
            )}
          </ChartContainer>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );
  };

  const renderChartSection = () => {
    return (
      <>
        <CustomBarChart
          chartData={subjectData}
          dataKey="attendancePercentage"
        />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectAttendance &&
          Array.isArray(subjectAttendance) &&
          subjectAttendance.length > 0 ? (
            <>
              {" "}
              <Paper
                sx={{
                  width: "95%",
                  overflow: "hidden",
                  margin: "40px",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "min-content",
                }}>
                {selectedSection === "table" && renderTableSection()}
                {selectedSection === "chart" && renderChartSection()}
              </Paper>
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
          ) : (
            <>
              <Typography variant="h6" gutterBottom component="div">
                Currently You Have No Attendance Details
              </Typography>
            </>
          )}
        </div>
      )}
    </>
  );
};
const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default ViewStdAttendance;

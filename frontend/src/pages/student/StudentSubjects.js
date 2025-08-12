import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
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

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const filteredSubjectMarks = subjectMarks.filter((result) => {
    return selectedSubject ? result.subName.subName === selectedSubject : true;
  });

  const renderSubjectDropdown = () => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Select Subject:
        </Typography>
        <select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">All Subjects</option>
          {subjectsList &&
            subjectsList.map((subject, index) => (
              <option key={index} value={subject.subName}>
                {subject.subName} ({subject.subCode})
              </option>
            ))}
        </select>
      </div>
    );
  };

  const renderFilteredTableSection = () => {
    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          {selectedSubject ? `${selectedSubject} Marks` : "Subject Marks"}
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Marks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredSubjectMarks.map((result, index) => {
              if (!result.subName || !result.marksObtained) {
                return null;
              }
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{result.subName.subName}</StyledTableCell>
                  <StyledTableCell>{result.marksObtained}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  };

  const renderFilteredChartSection = () => {
    return (
      <CustomBarChart
        chartData={filteredSubjectMarks}
        dataKey="marksObtained"
      />
    );
  };

  const renderClassDetailsSection = () => {
    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Class Details
        </Typography>
        <Typography variant="h5" gutterBottom>
          You are currently in Class {sclassDetails && sclassDetails.sclassName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          And these are the subjects:
        </Typography>
        {subjectsList &&
          subjectsList.map((subject, index) => (
            <div key={index}>
              <Typography variant="subtitle1">
                {subject.subName} ({subject.subCode})
              </Typography>
            </div>
          ))}
      </Container>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectMarks &&
          Array.isArray(subjectMarks) &&
          subjectMarks.length > 0 ? (
            <>
              {renderSubjectDropdown()}
              <Paper
                sx={{
                  width: "95%",
                  overflow: "hidden",
                  margin: "40px",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "min-content",
                }}>
                {selectedSection === "table" && renderFilteredTableSection()}
                {selectedSection === "chart" && renderFilteredChartSection()}
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
            <>{renderClassDetailsSection()}</>
          )}
        </div>
      )}
    </>
  );
};

export default StudentSubjects;

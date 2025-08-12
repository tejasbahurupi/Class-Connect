import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );

  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  //   const teachid= currentUser._id;
  //   console.log(teachid);

  useEffect(() => {
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      name: student.name,
      rollNum: student.rollNum,
      id: student._id,
    };
  });

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
      console.info(`You clicked ${options[selectedIndex]}`);
      if (selectedIndex === 0) {
        handleAttendance();
      } else if (selectedIndex === 1) {
        handleMarks();
      }
    };

    const handleAttendance = () => {
      navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
    };
    const handleMarks = () => {
      navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}>
          View
        </BlueButton>
        <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button">
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <BlackButton
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </BlackButton>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) =>
                            handleMenuItemClick(event, index)
                          }>
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      </>
    );
  };

  const teacher = currentUser._id;
  console.log(teacher);

  const ZoomMeetingForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();

      const topic = event.target.elements.topic.value;
      const date = event.target.elements.date.value;
      const startTime = event.target.elements.startTime.value;
      const duration = event.target.elements.duration.value;

      // Do something with the form values
      console.log("Topic:", topic);
      console.log("Date:", date);
      console.log("Start Time:", startTime);
      console.log("Duration:", duration);
      console.log("Teacher:", teacher);

      let start_time = `${date}T${startTime}`;

      // Clear form fields if needed
      event.target.reset();
      const resp = await fetch("http://localhost:5000/zoomLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          start_time,
          duration,
          teacher,
        }),
      });

      const res = await resp.json();
      console.log(res);
      // const res = await axios.post("http://127.0.0.1:5000/zoomLink", {
      //   body: {
      //     topic,
      //     start_time,
      //     duration,
      //     teacher,
      //   },
      //   headers: {
      //     contentType: `application/json`,
      //   },
      // });
      // const d = await res.json();
      if (window.confirm("Go to Link to Zoom")) {
        window.location.href = res;
      }
    };

    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
          onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              placeholder="Enter topic"
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              placeholder="Select date"
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              placeholder="Enter start time"
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <label htmlFor="duration">Duration (minutes):</label>
            <input
              type="number"
              id="duration"
              placeholder="Enter duration"
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
          <BlueButton
            type="submit"
            style={{ width: "100px", marginTop: "10px" }}>
            Submit
          </BlueButton>
        </form>
      </div>
    );
  };

  const [isFormVisible, setFormVisibility] = React.useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Typography variant="h4" align="center" marginTop="30px" gutterBottom>
            Class Details
          </Typography>
          {getresponse ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}>
                No Students Found
              </Box>
            </>
          ) : (
            <Paper
              sx={{ width: "90%", marginLeft: "40px", overflow: "hidden" }}>
              <Typography variant="h5" padding="10px" gutterBottom>
                Students List:
              </Typography>

              {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentsButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
              )}

              <Button onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Create Zoom"}{" "}
                {isFormVisible ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </Button>
              <br />

              {isFormVisible && <ZoomMeetingForm />}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default TeacherClassDetails;

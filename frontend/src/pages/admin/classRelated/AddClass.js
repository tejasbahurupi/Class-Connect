import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const {
    status,
    currentUser,
    response,
    error: apiError,
    tempDetails,
  } = userState;

  const adminID = currentUser._id;
  const address = "Sclass";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    sclassName,
    adminID,
  };

  const validateClassNameFormat = (className) => {
    // const classNameRegex = /^\d{2}-\d{2}$/;

    // if (!classNameRegex.test(className)) {
    //     setError("Invalid class name format. Use the format '12-13'.");
    //     return false;
    // }

    setError("");
    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (validateClassNameFormat(sclassName)) {
      setLoader(true);
      dispatch(addStuff(fields, address));
    }
  };

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate("/Admin/classes/class/" + tempDetails._id);
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, apiError, response, dispatch, tempDetails]);

  return (
    <>
      <StyledContainer>
        <StyledBox>
          <Stack
            sx={{
              alignItems: "center",
              mb: 3,
            }}>
            <img src={Classroom} alt="classroom" style={{ width: "80%" }} />
          </Stack>
          <form onSubmit={submitHandler}>
            <Stack spacing={3}>
              <TextField
                label="eg. 13-15"
                variant="outlined"
                value={sclassName}
                onChange={(event) => {
                  setSclassName(event.target.value);
                  setError("");
                }}
                required
                error={error !== ""}
                helperText={error}
              />
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}>
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create"
                )}
              </BlueButton>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Stack>
          </form>
        </StyledBox>
      </StyledContainer>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

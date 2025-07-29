import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.svg";
import { LightPurpleButton } from "../components/buttonStyles";
import { Diversity1Rounded } from "@mui/icons-material";

const Homepage = () => {
  return (
    // <StyledContainer>
    <div className="ashok">
      <StyledTitle>Welcome to ClassConnect</StyledTitle>
      <StyledText className="home-text">
        Unlocking Potential, One Personalized Learning Journey at a Time –
        Elevate Education with Seamless Class Management for Educators and
        Learners!
      </StyledText>
      <StyledBox>
        <StyledLink to="/choose">
          <LightPurpleButton variant="contained" fullWidth>
            Login
          </LightPurpleButton>
        </StyledLink>

        <StyledText>
          Don't have an account?{" "}
          <Link to="/Adminregister" style={{ color: "#550080" }}>
            Sign up
          </Link>
        </StyledText>
      </StyledBox>
    </div>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  min-height: 100vh; /* Make sure the container covers at least the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

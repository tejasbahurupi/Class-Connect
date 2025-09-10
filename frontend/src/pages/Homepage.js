import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { LightPurpleOutlinedButton } from "../components/buttonStyles";

const Homepage = () => {
  return (
    // <StyledContainer>
    <div className="containrr">
      <StyledTitle>Welcome to ClassConnect</StyledTitle>
      <StyledText className="home-text">
        Unlocking Potential, One Personalized Learning Journey at a Time –
        Elevate Education with Seamless Class Management for Educators and
        Learners!
      </StyledText>
      <StyledBox>
        <StyledLink to="/choose">
          {/* <LightPurpleButton variant="contained" fullWidth>
            Login
          </LightPurpleButton> */}
          <LightPurpleOutlinedButton variant="outlined" endIcon={<SendIcon />}>
            Get Started
          </LightPurpleOutlinedButton>
        </StyledLink>

        {/* <StyledText>
          Don't have an account?{" "}
          <Link to="/Adminregister" style={{ color: "#550080" }}>
            Sign up
          </Link>
        </StyledText> */}
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
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  padding: 0px;
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
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

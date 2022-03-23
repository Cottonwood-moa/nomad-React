import { Outlet } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 56px;
  font-weight: bold;
`;
const About = () => {
  return (
    <Container>
      <h1>About</h1>
      <Outlet />
    </Container>
  );
};

export default About;

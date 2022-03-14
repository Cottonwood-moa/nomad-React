import styled, { keyframes } from "styled-components";

function App() {
  const rotate = keyframes`
    100%{
      transform: rotate(360deg);
    }
  `;
  const Wrap = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: violet;
  `;
  const Box = styled.div<{ bgColor: string }>`
    width: 100px;
    height: 100px;
    background-color: ${({ bgColor }) => bgColor};
    /* ${(props) => props.bgColor} */
  `;
  const Circle = styled(Box)`
    border-radius: 50%;
  `;
  const Input = styled.input.attrs({ minLength: 10, disabled: true })`
    background-color: tomato;
  `;
  const Emoji = styled.span`
    font-size: 36px;
    transition: 0.4s;
  `;
  const RotateBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotate} 2s linear infinite;
    ${Emoji} {
      font-size: 36px;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        font-size: 48px;
      }
    }
  `;
  const TestTheme = styled.div`
    width: 200px;
    height: 200px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
  `;
  return (
    <>
      <Wrap>
        <Box bgColor="orange"></Box>
        <Circle bgColor="tomato"></Circle>
        <Circle as="a" bgColor="royalBlue">
          as Button
        </Circle>
        <Input></Input>
        <Input></Input>
        <Input></Input>
        <RotateBox bgColor="royalblue">
          <Emoji>😊</Emoji>
        </RotateBox>
        <TestTheme>
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.
        </TestTheme>
      </Wrap>
    </>
  );
}

export default App;

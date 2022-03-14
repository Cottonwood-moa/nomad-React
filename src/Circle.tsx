import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  border: 10px solid ${(props) => props.borderColor};
  color: ${(props) => props.textColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
  textColor?: string;
}
// DOM
function Circle({
  bgColor,
  borderColor,
  text,
  textColor = "white",
}: CircleProps) {
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? bgColor}
      textColor={textColor}
    >
      {text ?? "Defalut text"}
    </Container>
  );
}

export default Circle;

// interface는 단순한 type의 선언.
// CircleProps는 부모에서 넘어온 props에 대한 자료형
// ContainerProps는 Container styled component에 대한 자료형

// interface UserInfo {
//   name: string;
//   age: number;
// }
// const sayHello = (user: UserInfo) =>
//   `Hello ${user.name}! You are ${user.age} years old!`;

// sayHello({name:'Cottonwood', age:28})
// sayHello({name:'Cottonwood', age:28, email:'geon0529@gmail.com'})

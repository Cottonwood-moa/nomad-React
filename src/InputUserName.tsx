import React, { useState } from "react";
import styled from "styled-components";
function InputUserName() {
  const Click = styled.div`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
  `;
  // useState의 init value로 타입이 자동으로 정해진다. (typescript)
  const [name, setName] = useState("");
  // 이벤트의 타입을 지정해줘야 한다.
  // 어떤 이벤트이고 어떤 요소에서 발생하는지.
  // 이건 구글링해서 문서를 찾아봐야 하고 처음에는 낯설지만 금방 익숙해진다고 한다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", name);
  };
  // 변수와 같이 사용되는 이벤트의 경우 이렇게 작성한다.
  const onClick =
    (str: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      console.log("클릭발생", str);
    };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
      </form>
      <Click onClick={onClick("변수")}>클릭이벤트</Click>
    </>
  );
}

export default InputUserName;

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  // hours는 selector의 get에서 return 되는 값
  // setHours는 selector의 set에서 만든 modifier fn
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    // +"123" => 123 (숫자로 쉽게 변환)
    // 123 + "" => 문자열 123 (숫자를 문자로 변환)
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;

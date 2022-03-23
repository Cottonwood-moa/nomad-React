import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
function ToDoList() {
  const seleted = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      {/*{...toDo} -> toDos의 toDo와 <ToDo /> 컴포넌트의 props가 같은 interface를 가리키고 있으니 가능한 문법이다. */}
      <div>
        <CreateToDo />
        <h2>todo</h2>
        <select onInput={onInput} value={category}>
          <option value={Categories.TO_DO}>TO_DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </select>
        <ul>
          {seleted.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;

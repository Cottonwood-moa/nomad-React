import { useSetRecoilState } from "recoil";
import { Categories, IToDo } from "../atoms";
import { toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const result = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      return result;
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      // oldToDos는 read only로 직접 변경이 불가능 하다.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const result = [...oldToDos];
      result.splice(targetIndex, 1);
      return result;
    });
  };
  return (
    <li>
      <span>
        {text} {category}
      </span>
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>TO_DO</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>DOING</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
export default ToDo;

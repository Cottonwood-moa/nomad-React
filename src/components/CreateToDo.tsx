import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
// form에서 받아올 데이터 들의 타입
interface IForm {
  toDo: string;
  // test
}

function CreateToDo() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const onValid = (data: IForm) => {
    setToDos((prev) => [
      { id: Date.now(), text: data.toDo, category },
      ...prev,
    ]);
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <span>{errors?.toDo?.message}</span>
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;

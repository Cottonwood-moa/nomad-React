import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
interface IForm {
  BoardName: string;
}
function AddBoard() {
  const { register, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ BoardName }: IForm) => {
    setToDos((prev) => {
      return {
        ...prev,
        [BoardName]: [],
      };
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("BoardName", {
            required: true,
          })}
          placeholder="Add Board"
        />
      </form>
    </>
  );
}

export default AddBoard;

import { atom, selector } from "recoil";
interface IToDo {
  [key: string]: string[];
}
export const toDoState = atom<IToDo>({
  key: "toDo",
  default: {
    "To Do": ["A", "B"],
    Doing: ["C", "D", "E"],
    Done: ["F", "G"],
  },
});

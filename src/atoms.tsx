import { atom, selector } from "recoil";
export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const board = atom({
  key: "board",
  default: [1, 2, 3],
});

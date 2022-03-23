import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  // "TO_DO",
  // "DOING",
  // "DONE",
  // 위같이 적으면 프로그래머의 편의를 위해 숫자로 구분된다.
  // 문자열을 그대로 넣고 싶다면 밑과같이.
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
// toDo라는 key 값을 가진 배열 state
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((article) => article.category === category);
  },
});

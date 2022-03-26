import { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div`
  padding: 0px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width: 30rem;
  margin: 1rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  text-align: center;
`;
interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}
const Area = styled.div<IArea>`
  height: 100%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.isDraggingFromThisWith
      ? "red"
      : "blue"};
  transition: 0.2s ease-in-out;
  padding: 10px;
  flex: 1;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId, index }: IBoardProps) {
  const test = useRecoilValue(toDoState);
  const setTodos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit, reset } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newToDo],
      };
    });
    reset();
  };
  useEffect(() => {}, [test]);
  return (
    <Draggable draggableId={boardId} index={index}>
      {(magic, snapshot) => (
        <Wrapper ref={magic.innerRef} {...magic.draggableProps}>
          <Title {...magic.dragHandleProps}>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", {
                required: true,
              })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} type={`card`}>
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((todo, index) => (
                  <DraggableCard
                    key={todo.id}
                    todoId={todo.id}
                    todoText={todo.text}
                    boardId={boardId}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;

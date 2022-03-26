import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
interface IProps {
  todoId: number;
  todoText: string;
  index: number;
  boardId: string;
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "orange" : (props) => props.theme.cardColor};
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
  }
`;

function DraggableCard({ todoId, index, todoText, boardId }: IProps) {
  const setToDos = useSetRecoilState(toDoState);
  const cardDelete = () => {
    setToDos((prev) => {
      const copy = [...prev[boardId]];
      copy.splice(index, 1);
      return {
        ...prev,
        [boardId]: copy,
      };
    });
  };
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todoText}
          <div onClick={cardDelete}>&times;</div>
        </Card>
      )}
    </Draggable>
  );
}
// props가 바뀔때만 re-render된다.
export default React.memo(DraggableCard);

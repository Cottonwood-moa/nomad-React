import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IProps {
  todoId: number;
  todoText: string;
  index: number;
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "orange" : (props) => props.theme.cardColor};
`;

function DraggableCard({ todoId, index, todoText }: IProps) {
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
        </Card>
      )}
    </Draggable>
  );
}
// props가 바뀔때만 re-render된다.
export default React.memo(DraggableCard);

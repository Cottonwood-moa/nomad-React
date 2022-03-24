import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IProps {
  todo: string;
  index: number;
}
const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({ todo, index }: IProps) {
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}
// props가 바뀔때만 re-render된다.
export default React.memo(DraggableCard);

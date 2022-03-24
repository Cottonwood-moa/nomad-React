import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //   {
  //     "draggableId": "C",
  //     "type": "DEFAULT",
  //     "source": {
  //         "index": 2,
  //         "droppableId": "Doing"
  //     },
  //     "reason": "DROP",
  //     "mode": "FLUID",
  //     "destination": {
  //         "droppableId": "Done",
  //         "index": 2
  //     },
  //     "combine": null
  // }
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    setToDos((prev) => {
      if (destination?.droppableId === source.droppableId) {
        const boardCopy = [...prev[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      } else if (destination?.droppableId !== source.droppableId) {
        // 이전 보드에서 드래그 된걸 자른다.
        const souceBoard = [...prev[source.droppableId]];
        souceBoard.splice(source.index, 1);
        // 목적 보드에서 드래그 된걸 추가한다.
        if (!destination) return prev;
        const destinationBoard = [...prev[destination?.droppableId]];
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...prev,
          [source.droppableId]: souceBoard,
          [destination.droppableId]: destinationBoard,
        };
      }
      return prev;
    });
  };
  // ...magic.dragHandleProps 드래그 트리거
  // ...magic.draggableProps 드래그 가능 요소
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

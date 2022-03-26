import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import AddBoard from "./components/AddBoard";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Boards = styled.div`
  display: flex;
`;
const Trash = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: white;
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
  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source, type } = info;
    console.log(info);
    // category 이동
    if (type === "category") {
      if (!destination) return;
      setToDos((prev) => {
        const copy = { ...prev };
        const copyKeys = Object.keys(copy);
        copyKeys.splice(source.index, 1);
        copyKeys.splice(destination.index, 0, draggableId);
        let res: IToDoState = {};
        // eslint-disable-next-line array-callback-return
        copyKeys.map((a) => {
          const key = a.toString();
          res[key] = copy[a];
        });
        return res;
      });
    }
    // card 이동
    if (type === "card") {
      setToDos((prev) => {
        if (!destination) return prev;
        if (destination?.droppableId === source.droppableId) {
          const boardCopy = [...prev[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...prev,
            [source.droppableId]: boardCopy,
          };
        } else if (destination?.droppableId !== source.droppableId) {
          // grab한 card가 있는 board
          const sourceBoard = [...prev[source.droppableId]];
          // grab한 obj
          const taskObj = sourceBoard[source.index];
          // 이전 보드에서 드래그 된걸 자른다.
          sourceBoard.splice(source.index, 1);
          // 목적(destination) 보드에 드래그 된 걸(taskObj) 추가한다.
          const destinationBoard = [...prev[destination?.droppableId]];
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...prev,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        } else {
          return prev;
        }
      });
    }
  };
  useEffect(() => {
    const toDos = localStorage.getItem("toDos");
    toDos && setToDos(JSON.parse(toDos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  // ...magic.dragHandleProps 드래그 트리거
  // ...magic.draggableProps 드래그 가능 요소
  return (
    <>
      <AddBoard />
      <button onClick={() => window.localStorage.clear()}>
        localstorage 초기화
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={"category"}
          type={"category"}
          direction={"horizontal"}
        >
          {(magic, snapshot) => (
            <>
              <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                <Boards>
                  {Object.keys(toDos).map((boardId, index) => (
                    <Board
                      key={boardId}
                      boardId={boardId}
                      toDos={toDos[boardId]}
                      index={index}
                    />
                  ))}
                </Boards>
                {magic.placeholder}
              </Wrapper>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;

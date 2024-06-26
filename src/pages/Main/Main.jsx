import { DndProvider } from "react-dnd";
import { ShapeTypes } from "../../components/data/shapeTypes.js";
import Rectangle from "../../components/Rectangle/Rectangle.jsx";
import Circle from "../../components/Circle/Circle.jsx";
import Square from "../../components/Square/Square.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../../components/Board/Board.jsx";
import DraggableShape from "../../components/DraggableShape/DraggableShape.jsx";
import styles from "./main.module.css";
import Triangle from "../../components/Triangle/Triangle.jsx";
import AddText from "../../components/Add-Text/AddText.jsx";
export default function Main() {

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <div className={styles.side_bar}>
          <h3>Shapes</h3>
          <DraggableShape shapeType={ShapeTypes.RECTANGLE}>
            <Rectangle />
          </DraggableShape>
          <DraggableShape shapeType={ShapeTypes.CIRCLE}>
            <Circle />
          </DraggableShape>
          <DraggableShape shapeType={ShapeTypes.SQUARE}>
            <Square />
          </DraggableShape>
          <DraggableShape shapeType={ShapeTypes.TRIANGLE}>
            <Triangle />
          </DraggableShape>
          <DraggableShape shapeType={ShapeTypes.TEXT}>
            <AddText />
          </DraggableShape>
        </div>
        <div className={styles.Board}>
          <Board />
        </div>
      </div>
    </DndProvider>
  );
}

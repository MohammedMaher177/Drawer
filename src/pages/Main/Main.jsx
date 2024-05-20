import { DndProvider } from "react-dnd";
import { ShapeTypes } from "../../components/data/shapeTypes.js";
import Rectangle from "../../components/Rectangle/Rectangle.jsx";
import Circle from "../../components/Circle/Circle.jsx";
import Square from "../../components/Square/Square.jsx";
import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../../components/Board/Board.jsx";
import DraggableShape from "../../components/DraggableShape/DraggableShape.jsx";
import styles from "./main.module.css";
import Triangle from "../../components/Triangle/Triangle.jsx";
import AddText from "../../components/Add-Text/AddText.jsx";
import { randomId } from "../../util/util.js";
export default function Main() {
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);


  const handleDrop = (shapeType, x, y) => {
    const size =
      shapeType == "circle"
        ? { width: 50, height: 50 }
        : shapeType == "triangle"
        ? { width: 25, height: 50 }
        : shapeType == "square"
        ? { width: 50, height: 50 }
        : shapeType == "rectangle"
        ? { width: 75, height: 40 }
        : null;
    setShapes((shapes) => [
      ...shapes,
      { type: shapeType, x, y, id: randomId(), ...size },
    ]);
  };

  const connectShapes = (shapeId1, shapeId2) => {
    const shape1 = shapes.find((shape) => shape.id === shapeId1);
    const shape2 = shapes.find((shape) => shape.id === shapeId2);
    if (shape1 && shape2) {
      const newLine = {
        id: `${shapeId1}-${shapeId2}`,
        points: [
          +shape1.x + +shape1.width / 2,
          +shape1.y + +shape1.height / 2,
          +shape2.x + +shape2.width / 2,
          +shape2.y + +shape2.height / 2,
        ],
        stroke: "black",
        strokeWidth: 2,
      };
      setLines([...lines, newLine]);
    }
    setSelectedShapeId(null);
  };

  const handleShapeDragMove = (shapeId, newPosition) => {
    const updatedLines = lines.map(line => {
      const [startShapeId, endShapeId] = line.id.split('-');
      if (startShapeId === shapeId) {
        line.points[0] =( newPosition.x + shapes.find(shape => shape.id === shapeId).width / 2) ;
        line.points[1] = (newPosition.y + shapes.find(shape => shape.id === shapeId).height / 2);
      } else if (endShapeId === shapeId) {
        line.points[2] = (newPosition.x + shapes.find(shape => shape.id === shapeId).width / 2) ;
        line.points[3] = (newPosition.y + shapes.find(shape => shape.id === shapeId).height / 2);
      }
      return line;
    });
    setLines(updatedLines);
  };


  const handleShapeClick = (shapeId) => {
    selectedShapeId
      ? connectShapes(selectedShapeId, shapeId)
      : setSelectedShapeId(shapeId);
  };
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
          <Board
            shapes={shapes}
            onDrop={handleDrop}
            lines={lines}
            handleShapeClick={handleShapeClick}
            handleShapeDragMove={handleShapeDragMove}
          />
        </div>
      </div>
    </DndProvider>
  );
}

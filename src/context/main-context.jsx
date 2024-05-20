/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { randomId } from "../util/util.js";

export const mainContext = createContext();

export default function MainContextProvider(props) {
  const [texts, setTexts] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [shapes, setShapes] = useState([]);

  const connectShapes = (shapeId1, shapeId2) => {
    const shape1 = shapes.find((shape) => shape.id === shapeId1);
    const shape2 = shapes.find((shape) => shape.id === shapeId2);
    if (shape1 && shape2) {
      const newLine = {
        id: `${shapeId1}-${shapeId2}`,
        start: { x: shape1.x, y: shape1.y },
        end: { x: shape2.x, y: shape2.y },
        stroke: "black",
        strokeWidth: 2,
      };
      setLines([...lines, newLine]);
    }
    setSelectedShapeId(null);
  };

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

  const handleShapeClick = (shapeId) => {
    if (selectedShapeId) {
      connectShapes(selectedShapeId, shapeId);
    } else {
      setSelectedShapeId(shapeId);
    }
  };

  const handleShapeDragMove = (shapeId, newPosition) => {
    const updatedLines = lines.map((line) => {
      const [startShapeId, endShapeId] = line.id.split("-");
      if (startShapeId === shapeId) {
        line.start = {
          x:
            newPosition.x +
            shapes.find((shape) => shape.id === shapeId).width / 2,
          y:
            newPosition.y +
            shapes.find((shape) => shape.id === shapeId).height / 2,
        };
      } else if (endShapeId === shapeId) {
        line.end = {
          x:
            newPosition.x +
            shapes.find((shape) => shape.id === shapeId).width / 2,
          y:
            newPosition.y +
            shapes.find((shape) => shape.id === shapeId).height / 2,
        };
      }
      return line;
    });
    setLines(updatedLines);
  };

  const handleShapeMouseEnter = (id) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, strokeEnabled: true } : shape
    );
    setShapes(updatedShapes);
  };

  const handleShapeMouseLeave = (id) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, strokeEnabled: false } : shape
    );
    setShapes(updatedShapes);
  };

  const moveItem = (id, x, y) => {
     setShapes((prevItems) =>
       prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
     );
  };

  const updatePosition = (id, x, y) => {
    setShapes((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };
  return (
    <mainContext.Provider
      value={{
        texts,
        setTexts,
        lines,
        setLines,
        selectedShapeId,
        setSelectedShapeId,
        shapes,
        setShapes,
        connectShapes,
        handleDrop,
        handleShapeClick,
        handleShapeDragMove,
        handleShapeMouseEnter,
        handleShapeMouseLeave,
        moveItem,
        updatePosition
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
}

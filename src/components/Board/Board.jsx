import { useDrop } from "react-dnd";
import { Stage, Layer, Rect, Circle, Line, Text, Group, Arrow } from "react-konva";
import PropTypes from "prop-types";
import { ShapeTypes } from "../data/shapeTypes.js";
import { useContext } from "react";
import { textContext } from "../../context/text-context.jsx";

const Board = ({
  shapes,
  onDrop,
  lines,
  handleShapeClick,
  handleShapeDragMove,
  handleShapeMouseEnter,
  handleShapeMouseLeave,
}) => {
  const { texts } = useContext(textContext);

  const [, drop] = useDrop({
    accept: Object.values(ShapeTypes),
    drop: (item, monitor) => {
      const delta = monitor.getClientOffset();
      onDrop(item.shapeType, delta.x, delta.y);
    },
  });

  return (
    <div ref={drop}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape, index) => {
            switch (shape.type) {
              case ShapeTypes.RECTANGLE:
                return (
                  <Group
                    key={shape.id}
                    draggable
                    onDragMove={(e) =>
                      handleShapeDragMove(shape.id, e.target.position())
                    }
                  >
                    <Rect
                      x={shape.x - 50}
                      y={shape.y}
                      fill="blue"
                      id={shape.id}
                      text={shape.id}
                      width={shape.width}
                      height={shape.height}
                      onClick={() => handleShapeClick(shape.id)}
                      onMouseEnter={() => handleShapeMouseEnter(shape.id)}
                      onMouseLeave={() => handleShapeMouseLeave(shape.id)}
                      stroke={shape.strokeEnabled ? "black" : null}
                      strokeWidth={shape.strokeEnabled ? 2 : 0}
                    />
                    <Text
                      text={`ID: ${shape.id}`}
                      x={shape.x - 50}
                      y={shape.y - 20}
                      fontSize={12}
                    />
                  </Group>
                );
              case ShapeTypes.CIRCLE:
                return (
                  <Group
                    key={shape.id}
                    draggable
                    onDragMove={(e) =>
                      handleShapeDragMove(shape.id, e.target.position())
                    }
                  >
                    <Circle
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      radius={shape.width / 2}
                      fill="red"
                      id={shape.id}
                      text={shape.id}
                      onClick={() => handleShapeClick(shape.id)}
                      onMouseEnter={() => handleShapeMouseEnter(shape.id)}
                      onMouseLeave={() => handleShapeMouseLeave(shape.id)}
                      stroke={shape.strokeEnabled ? "black" : null}
                      strokeWidth={shape.strokeEnabled ? 2 : 0}
                    />
                    <Text
                      text={`ID: ${shape.id}`}
                      x={shape.x - 30}
                      y={shape.y - 30}
                      fontSize={12}
                    />
                  </Group>
                );
              case ShapeTypes.SQUARE:
                return (
                  <Group
                    key={shape.id}
                    draggable
                    onDragMove={(e) =>
                      handleShapeDragMove(shape.id, e.target.position())
                    }
                  >
                    <Rect
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      fill="green"
                      id={shape.id}
                      text={shape.id}
                      onClick={() => handleShapeClick(shape.id)}
                      onMouseEnter={() => handleShapeMouseEnter(shape.id)}
                      onMouseLeave={() => handleShapeMouseLeave(shape.id)}
                      stroke={shape.strokeEnabled ? "black" : null}
                      strokeWidth={shape.strokeEnabled ? 2 : 0}
                    />
                    <Text
                      text={`ID: ${shape.id}`}
                      x={shape.x}
                      y={shape.y - 15}
                      fontSize={12}
                    />
                  </Group>
                );
              case ShapeTypes.TRIANGLE:
                return (
                  <Group
                    key={shape.id}
                    draggable
                    onDragMove={(e) =>
                      handleShapeDragMove(shape.id, e.target.position())
                    }
                  >
                    <Line
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      points={[0, 0, 25, -50, 50, 0]}
                      onClick={() => handleShapeClick(shape.id)}
                      closed
                      fill="yellow"
                      id={shape.id}
                      text={shape.id}
                      onMouseEnter={() => handleShapeMouseEnter(shape.id)}
                      onMouseLeave={() => handleShapeMouseLeave(shape.id)}
                      stroke={shape.strokeEnabled ? "black" : null}
                      strokeWidth={shape.strokeEnabled ? 2 : 0}
                    />
                    <Text
                      text={`ID: ${shape.id}`}
                      x={shape.x - 10}
                      y={shape.y - 60}
                      fontSize={12}
                    />
                  </Group>
                );
              default:
                return null;
            }
          })}
          {texts.map((text) => (
            <Text
              key={text.id}
              id={text.id}
              x={text.x}
              y={text.y}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.fill}
              draggable
            />
          ))}
          {lines.map((line, index) => (
            <Arrow
              key={index}
              points={[line.start.x, line.start.y, line.end.x, line.end.y]}
              stroke={line.stroke}
              fill={line.stroke}
              strokeWidth={line.strokeWidth}
              pointerLength={10}
              pointerWidth={10}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

Board.propTypes = {
  shapes: PropTypes.array,
  lines: PropTypes.array,
  onDrop: PropTypes.func,
  handleShapeClick: PropTypes.func,
  handleShapeDragMove: PropTypes.func,
  handleShapeMouseEnter: PropTypes.func,
  handleShapeMouseLeave: PropTypes.func,
};

export default Board;

{
  /* <Star
  key={index}
  id={shape.id}
  x={shape.x}
  y={shape.y}
  numPoints={5}
  innerRadius={20}
  outerRadius={40}
  fill="#89b717"
  opacity={0.8}
  draggable
  rotation="0"
  shadowColor="black"
  shadowBlur={10}
  shadowOpacity={0.6}
/>; */
}

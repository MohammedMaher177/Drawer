import { useDrop } from "react-dnd";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import PropTypes from "prop-types";
import { ShapeTypes } from "../data/shapeTypes.js";

const Board = ({ shapes, onDrop }) => {
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
                  <Rect
                    key={index}
                    x={shape.x - 50}
                    y={shape.y}
                    width={100}
                    height={50}
                    fill="blue"
                  />
                );
              case ShapeTypes.CIRCLE:
                return (
                  <Circle
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    radius={50}
                    fill="red"
                  />
                );
              case ShapeTypes.SQUARE:
                return (
                  <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={50}
                    height={50}
                    fill="green"
                  />
                );
              case ShapeTypes.TRIANGLE:
                return (
                  <Line
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    points={[0, 0, 50, -100, 100, 0]}
                    closed
                    fill="yellow"
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

Board.propTypes = {
  shapes: PropTypes.array,
  onDrop: PropTypes.func,
};

export default Board;


{/* <Star
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
/>; */}
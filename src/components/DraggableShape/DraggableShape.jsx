/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useDrag } from "react-dnd";
import { mainContext } from "../../context/main-context.jsx";

const DraggableShape = ({ shapeType, children }) => {
  const { moveItem } = useContext(mainContext);
  const [{ isDragging }, drag] = useDrag({
    type: shapeType,
    item: { shapeType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveItem(item.id, dropResult.x, dropResult.y);
      }
    },
  });

  return (
    <div
      ref={drag}
      style={{
        borderRadius: "50%",
        width: "fit-content",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableShape;

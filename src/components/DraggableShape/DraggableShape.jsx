/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";

const DraggableShape = ({ shapeType, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: shapeType,
    item: { shapeType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ borderRadius: "50%", width: "fit-content", opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableShape;

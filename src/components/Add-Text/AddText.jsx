import { useContext, useState } from "react";
import styles from "./addtext.module.css";
import { randomId } from "../../util/util.js";
import { mainContext } from "../../context/main-context.jsx";
export default function AddText() {
  const { texts, setTexts } = useContext(mainContext);
  const [textInput, setTextInput] = useState("");

  const addText = () => {

    const newText = {
      id: randomId(),
      x: 250,
      y: 200,
      text: textInput,
      fontSize: 20,
      fill: "red",
    };
    setTexts([...texts, newText]);
    setTextInput("");
  };
  return (
    <>
      <div className={styles.card}>
        <label className={styles.input}>
          <input
            className={styles.input__field}
            type="text"
            placeholder=" "
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <span className={styles.input__label}>Enter text...</span>
        </label>
        <div className={styles.button_group} disabled={!textInput.length} onClick={addText}>
          <button>Add Text</button>
        </div>
      </div>
    </>
  );
}

AddText.propTypes = {};

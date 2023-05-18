import styles from "../styles/Button.module.css";
import Link from "next/link";

function Button(props) {
  // BUTTON PROPS WHEN CALLING BUTTON TAG ON OTHER COMPONENTS
  const backgroundColor = { backgroundColor: props.backgroundColor };
  const borderColor = { border: `3px solid ${props.borderColor}` };
  const textColor = { color: props.textColor };
  const text = props.text;

  return (
    <button
      className={styles.button}
      style={{ ...backgroundColor, ...borderColor, ...textColor }}
    >
      {text}
    </button>
  );
}

export default Button;

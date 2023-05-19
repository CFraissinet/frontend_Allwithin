import styles from "../styles/Button.module.css";
import { useState } from "react";

function Button(props) {
  const text = props.text;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      className={styles.button}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        backgroundColor: isHovering
          ? `${props.backgroundColorHover}`
          : `${props.backgroundColor}`,
        color: isHovering ? `${props.textColorHover}` : `${props.textColor}`,
        border: isHovering
          ? `3px solid ${props.borderColorHover}`
          : `3px solid ${props.borderColor}`,
      }}
    >
      {text}
    </button>
  );
}

export default Button;

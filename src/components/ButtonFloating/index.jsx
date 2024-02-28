import Button from "../Button";
import styles from "./ButtonFloating.module.css";
const ButtonFloating = ({children}) => {
  return (
    <div>
      <Button type={"button"} props={{ class: styles.ButtonFloating }}>
        {children}
      </Button>
    </div>
  );
};

export default ButtonFloating;

import { LuHome } from "react-icons/lu";
import Button from "../Button"
import styles from "./ButtonFloating.module.css";
const ButtonFloating = () => {
  return (
    <div>
      <Button type={'button'} props={{"children":(<LuHome/>), "class": styles.ButtonFloating}} />
    </div>
  )
}

export default ButtonFloating
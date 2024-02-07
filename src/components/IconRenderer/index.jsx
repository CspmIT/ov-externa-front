import { FaCircle } from 'react-icons/fa';
import { FaFileAlt } from "react-icons/fa";

const IconRenderer = ({ iconName, color }) => {
    switch (iconName) {
        case 'FaCircle':
            return <FaCircle className={color} />;
        case 'FaFileAlt':
            return <FaFileAlt />;
        default:
            return null;
    }
};

export default IconRenderer;
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ExpandRowButton = ({ row }) => {
  return (
    <IconButton onClick={() => row.toggleExpanded()}>
      {row.getIsExpanded() ? <ExpandLess /> : <ExpandMore />}
    </IconButton>
  );
};

export default ExpandRowButton;
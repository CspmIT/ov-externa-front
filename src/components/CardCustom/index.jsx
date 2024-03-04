import { Box } from "@mui/material";

function CardCustom({ ref, children, ...prop }) {
    return <Box ref={ref} className={`p-0 rounded-xl bg-white dark:bg-zinc-700 shadow-[2px_3px_5px_0px_#0000001f] ${prop.className}`}>{children}</Box>;
}
export default CardCustom;

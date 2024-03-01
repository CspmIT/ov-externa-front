function CardCustom({ children, ...prop }) {
    return <div className={prop.className ?? "pb-5 mr-3 mb-3 rounded-xl px-5 bg-white dark:bg-zinc-700 shadow-lg"}>{children}</div>;
}
export default CardCustom;

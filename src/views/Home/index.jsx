import Dashboard_lvl2 from "../../components/DashBoardCustomer/Dashboard_lvl2";
import Dashboard_lvl1 from "../../components/DashBoardCustomer/Dashboard_lvl1";
const Home = () => {
    var level = JSON.parse(localStorage.getItem("usuario"))?.level;
    return <div className="flex flex-wrap w-full">{level == 1 ? <Dashboard_lvl1 /> : <Dashboard_lvl2 />}</div>;
};

export default Home;

import Dashboard_lvl2 from "../../components/DashBoardCustomer/Dashboard_lvl2";
import Dashboard_lvl1 from "../../components/DashBoardCustomer/Dashboard_lvl1";
const Dashboard = () => {
    var level = JSON.parse(localStorage.getItem("usuario")).level;
    return (
        <>
            {level == 1 ? <Dashboard_lvl1 /> : <Dashboard_lvl2 />}
        </>
    );
};

export default Dashboard;

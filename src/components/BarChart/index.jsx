import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const BarChar = ({ ...prop }) => {
    const infoGraf = prop.data;
    const { darkMode } = useContext(UserContext);
    const options = {
        title: {
            text: `${prop.title ?? "Grafico"}`,
            style: { color: !darkMode ? "#fff" : "#000000", fontSize: "18px" },
        },
        xAxis: {
            labels: {
                style: {
                    color: !darkMode ? "#fff" : "#000000",
                },
            },
            style: { color: !darkMode ? "#fff" : "#000000" },
            lineColor: !darkMode ? "#fff" : "#000000",
            categories: infoGraf.label,
        },
        yAxis: {
            title: {
                text: `${window.innerWidth < 760 ? "" : "Valores (" + prop.nameSeria + ")"}`,
                style: {
                    color: !darkMode ? "#fff" : "#000000",
                    fontSize: "1rem",
                },
            },
            labels: {
                style: {
                    color: !darkMode ? "#fff" : "#000000",
                },
            },
        },
        chart: {
            backgroundColor: "transparent",
        },
        legend: {
            itemStyle: { color: !darkMode ? "#fff" : "#000000", fontSize: "1rem" },
        },
        accessibility: {
            enabled: false,
        },

        series: [
            {
                name: `${prop.nameSeria}`,
                type: "column",
                data: infoGraf.data,
            },
        ],
    };
    return (
            <HighchartsReact highcharts={Highcharts} options={options} />

    );
};
export default BarChar;

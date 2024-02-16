import React from 'react'
import { Bar } from 'react-chartjs-2';

const index = ({ data, labels }) => {
    const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF9800', '#2196F3'];
    const dynamicColors = colorPalette.slice(0, data.length);
    const barChartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: dynamicColors,
            },
        ],
    };
    // const animatedOptions = {
    //     animation: {
    //         animateRotate: false,
    //         animateScale: false,
    //         duration: 5000,
    //     },
    // };
    return <Bar data={barChartData}  />;
};

export default index
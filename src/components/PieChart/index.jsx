import React from 'react'
import { Pie } from 'react-chartjs-2'

const index = ({ data, colorPalette, labels }) => {
  const dynamicColors = colorPalette.slice(0, data.length)
  const pieChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: dynamicColors
      }
    ]
  }
  const animatedOptions = {
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 5000
    }
  }
  return <Pie data={pieChartData} options={animatedOptions} />
}

export default index

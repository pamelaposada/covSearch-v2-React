import "./BarChart.css"

import { Bar } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart =(props) => {


    // console.log(props.chartData)
 
  
    const countryName = props.chartData.map(item=> item[1].Country_Region)
    const dataValue = props.chartData.map(item => item[1].Confirmed)
    const labelsData = props.chartData.map(item => item[1].Province_State)

    const data = {
        labels: labelsData,
        datasets: [{
            label: `Total Current Covid-19 Cases in ${countryName[0]}`,
            data: dataValue,
            backgroundColor: 'rgba(255, 151, 47, 1)',
            borderColor: 'none',
            hoverBackgroundColor: 'rgba(0, 208, 255)',
            hoverBorderColor: 'none',
            borderWidth: 1
        }]
    }
        const optionsSettings = {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }


    return(
       
        <div className="chart-div">
            <Bar data={data} options={optionsSettings}/>
        </div>
   
        
    )
}

export default BarChart
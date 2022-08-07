import { Bar } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'


function BarComparisonChart (props) {

    // const countryName = props.chartData.map(item=> item[1].Country_Region)
    const dataValue = props.comparisonData.map(item => item[1].Confirmed)
    const labelsData = props.comparisonData.map(item => item[1].Province_State)
    const deaths = props.comparisonData.map(item=> item[1].Deaths)

    // console.log(deaths)

    const data = {
        labels: labelsData,
        datasets: [{
            label: `Covid-19 cases`,
            data: dataValue,
            backgroundColor: 'rgb(63, 39, 218)',
            borderColor: 'none',
            hoverBackgroundColor: 'rgba(0, 208, 255)',
            hoverBorderColor: 'none',
            borderWidth: 1
        },{
            label: `Deaths`,
            data: deaths,
            backgroundColor: 'rgb(255, 0, 0)',
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

export default BarComparisonChart
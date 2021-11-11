import React from "react";
import { Line } from 'react-chartjs-2';
import '../Graphics/graphics.css'

function Graphics(props){
    const data={
        labels: props.labels,
        datasets:[
            {
            label: "Pacientes activos",
            fill: true,
            backgroundColor:'#a2cf6e',
            borderColor:"white",
            pointBorderColor: '#007bb2',
            pointBorderWidth:1,
            pointHoverRadius:5,
            pointHoverBackgroundColor:'lime',
            pointHoverBorderColor: 'lime',
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data,
            lineTension: 0.5,
            }
        ]
    }
    
    return (
        <div className='containerGrafica'>
            <Line data={data}/>
        </div>

    );
}

export default Graphics;
import React from "react";
import { Line } from 'react-chartjs-2';
import '../Graphics/graphics.css'

function Graphics(props){
    const data={
        labels: ['Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto'],
        datasets:[
            {
            label: "NUEVOS PACIENTES",
            fill: true,
            backgroundColor:'lime',
            borderColor:"white",
            pointBorderColor: 'lime',
            pointBorderWidth:1,
            pointHoverRadius:5,
            pointHoverBackgroundColor:'lime',
            pointHoverBorderColor: 'lime',
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10, 25, 17, 32, 57, 199],
            lineTension: 0.4,
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
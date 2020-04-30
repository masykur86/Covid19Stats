import React, {useState,useEffect} from 'react';
import {fetchDailydata} from '../../api';
import {Line,Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';  
 
    

const Chart = ({data:{confirmed,deaths,recovered},country}) => {
    const [dailyData,setDailyData] = useState([]);

    useEffect(() =>{
        const fectApi = async () =>{
            setDailyData(await fetchDailydata ());
        }

        console.log(dailyData);
        fectApi();
    }, []);
    
    const lineChart =(
        dailyData.length
        ?(
            <Line
                data={{
                    labels:dailyData.map(({date})=>date),    
                    datasets:[{
                        data:dailyData.map(({confirm})=>confirm),
                        label:'infected',
                        borderColor:'#3333ff',
                        fill:true,
                    },{
                        data:dailyData.map(({deaths})=>deaths),
                        label:'Deaths',
                        backgroundColor :'rgba(255,0,0,0.5)',
                        fill:true,
                    }],
                }}
            />) :null
    );

    console.log(confirmed,recovered, deaths)
    const barChart = (
        confirmed ?(
            <Bar data ={
                {
                    labels : ['infected','recovered','deaths'],
                    datasets:[{
                        label: 'People',
                        backgroundColor:[
                            'rgba(0,0,255, 0.5)',
                            'rgba(0,255,0, 0.5)',
                            'rgba(255,0,0, 0.5)',
                        ],
                        data:[confirmed.value,recovered.value, deaths.value]


                    }]
                }
            } options={
                {
                    legend :{display : false},
                    title:{display :true, text:`Current State in ${country}`},
                }
            }/>
 
            
        ) :null
    )

 
    return (
        <div  className={styles.container}>
            {country? barChart :lineChart}
        </div>
    )
}

export default Chart;

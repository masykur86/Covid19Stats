import React from 'react';

import { Cards,Chart, CountryPicker } from "./components/";
import styles from './App.module.css';
import { fetchData} from './api';
import covidImage  from './images/image.png';

export default class App extends React.Component {

    state ={
          data :{},
          country: '',
    }
    
    async componentDidMount(){
        const fetchedData = await fetchData(); 

        this.setState({data : fetchedData});
    }

    hadleCountryChange = async(country) =>{
        const fetchedData = await fetchData(country);  
        this.setState({data : fetchedData, country : country});
    }
   
    render() {
        const {data,country} = this.state;
        return (
            <div className={styles.container}>
            <img className={styles.image} src={covidImage} alt="covid" />
               <Cards data={data} />
                <CountryPicker hadleCountryChange={this.hadleCountryChange} ></CountryPicker>
               <Chart data={data} country={country} ></Chart>
            </div>
        );
    }
}


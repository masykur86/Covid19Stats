import axios from "axios";

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
    let changeAbleurl = url;

    if(country){
        changeAbleurl = `${url}/countries/${country}`
    };
    try {
        // data diambil menggunakan destruktif arrat 
        const {data :{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeAbleurl);
        return {confirmed,recovered,deaths,lastUpdate} ;
    } catch (err) {
        console.log(err);
    }  
}   

export const fetchDailydata = async () => {
    try {
        const {data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) =>({
            confirm : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date: dailyData.reportDate

        }))
        return modifiedData;

    } catch (error) {
        console.log(error);
    }

}

export const fetchCountries = async () => {
    try {
        const {data : {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        
    }
}
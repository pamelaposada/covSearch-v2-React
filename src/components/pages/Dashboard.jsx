import './Dashboard.css'
import {MapContainer, GeoJSON, Popup, LayerGroup} from "react-leaflet"
import countriesData from '../data/countries.json'
import { createRef, useEffect, useRef, useState, useCallback } from 'react'
import Row from './dashboardComponents/Row'
import Loading from '../UI/Loading'

/**
 * allData: Object with shape {[countryName]: { All: {...}}}
 * countryName: string
 */
function getCasesCount(allData, countryName) {
    if (countryName === "United States of America") {
        countryName = 'US';
    }

    const foundCountryDataSet = Object.entries(allData).find(item=> item[0] === countryName);
    console.log(foundCountryDataSet)
    if (foundCountryDataSet === undefined) {
        return 'Unknown';
    }
    return foundCountryDataSet[1].All.confirmed;
}


const geoJsonData = countriesData.features

// Map style
const countryStyle = {
    fillColor: "#3f27da",
    fillOpacity: 1,
    color: "#181924",
    weight: 1,
}

function Dashboard(){
    const [selectedCountryName, setSelectedCountryName] = useState(null)
    // const [selectedCountryCasesCount, setSelectedCountryCasesCount] = useState(null) // TODO: es un estado derivado?
    const [worldCases, setWorldCases] = useState({})
    const [top20, setTop20] = useState([])
    const [activeFilter, setActiveFilter] = useState('highest');
    // const [geoDataTest, setGeoDataTest] = useState([])
   
    const geoJsonLayer = createRef()

    console.log('selectedCountryName', selectedCountryName)
    // console.log(worldCases)
    console.log(geoJsonData)
    // console.log(selectedCountryCasesCount)
    // console.log(countryObject)
    // console.log(top20)
    // console.log(activeFilter)


    
 

  
    // Cov-19 world cases
    useEffect(()=> {
        const fetchCovidWorldData = async ()=> {
            try{
                const url = "https://covid-api.mmediagroup.fr/v1/cases?All"
                const response = await fetch(url)
                const data = await response.json();
                setWorldCases(data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchCovidWorldData()
    }, [])


    // MapClick functions
    const handleClickCountry = (event) => {
        console.log(event);
        const clickedCountryName = event.target.feature.properties.ADMIN;
        // setSelectedCountryName(clickedCountryName);

        const casesCountForFeature = getCasesCount(worldCases, clickedCountryName);
        console.log(`calculando cases para ${clickedCountryName}: ${casesCountForFeature}`);

        event.target.bindPopup(`<center>${clickedCountryName}</center> <br />
            Cases : ${casesCountForFeature}`).openPopup();
    }

    const hoverCountry = (e)=> {
        e.target.setStyle({
            fillColor: "#902222"
        })
    }
    const blurCountry = (e)=> {
        e.target.setStyle({
            fillColor: "#3f27da"
        })
    }

    // useEffect(()=> {
    //     if(geoJsonLayer.current){
    //         geoJsonLayer.current.clearLayers().addData(geoJsonData)
    //     }
    // },[geoJsonData, geoJsonLayer])
    
    const handleEachCountryOnMount = useCallback(
        function(feature, layer) {
            

            layer.on('mouseover', hoverCountry)
            layer.on('mouseout', blurCountry)
        
            layer.on({
                click: handleClickCountry,
            })
        },[worldCases]);

    // useEffect(() => {
    //     if(Object.keys(worldCases).length && selectedCountryName != null) {
    //         console.log("yes")
    //         const casesCount = getCasesCount(worldCases, selectedCountryName);
    //         setSelectedCountryCasesCount(casesCount);
    //     } else {
    //         console.log("nope")
    //     }
    // }, [selectedCountryName, worldCases])


    // Country List Top20 - Btns
    useEffect(()=>{
        const arraysize = 21
        const top20Countries = ()=>{

            if(Object.keys(worldCases).length){
                const filterCountryData = Object.values(worldCases).map(item =>item.All)
    
                if(activeFilter === null || activeFilter === "highest"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.confirmed - a.confirmed)).slice(1, arraysize)
                    setTop20(sortedArray)
                }
                else if(activeFilter === "lowest"){
                    const sortedArray = filterCountryData.sort((a , b)=>(a.confirmed - b.confirmed)).slice(13, arraysize + 12)
                    setTop20(sortedArray)
                }
                else if(activeFilter === "population"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.population - a.population)).slice(0, arraysize - 1)
                    setTop20(sortedArray)
                }
                else if(activeFilter === "deaths"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.deaths - a.deaths)).slice(1, arraysize)
                    setTop20(sortedArray)
                }
            }
        }
        if(Object.keys(worldCases).length ){
            top20Countries()
        }
    },[activeFilter, worldCases])

    function handleBtnsFilter(e) {
        e.preventDefault()
        console.log(e.target.value)
        setActiveFilter(e.target.value)
    }

    if(worldCases === []){
        return <Loading/>
    }
 
    return(
        <div className='dashboard-page'>
            <h1>World Covid-19 Cases</h1>
        
            <div className='map-div'>
                <MapContainer center={[30, 10]} zoom={1} minZoom={2} maxZoom={4} dragging={true} zoomControl={false} >
                    {Object.keys(worldCases).length > 0 && <GeoJSON 
                        data={countriesData.features} 
                        style={countryStyle}
                        onEachFeature={handleEachCountryOnMount}
                        // ref={geoJsonLayer}
                        // key={selectedCountryCasesCount}    
                    />}
 
                    
                </MapContainer>
            </div>
            <h1 className='country-title'>Top 20 countries</h1>
            {/* Btns */}
            <p className='filter-text'> Filter by</p>
            <div className='filters'>
                <div className='btns'>
                <button className='btn-p btn' value='lowest' onClick={handleBtnsFilter}>Lowest cases per country</button>

                <button className='btn-p-and-s btn' value='highest' onClick={handleBtnsFilter}>Highest cases per country</button>

                <button className='btn-p-and-s btn' value='population' onClick={handleBtnsFilter} >Population</button>

                <button className='btn-all btn' value={'deaths'} onClick={handleBtnsFilter}>Deaths</button>
                </div>
            </div>

            <div className='container-bar'>
                <h3>Country</h3>
                <h3>Population</h3>
                <h3>Confirmed cases</h3>
                <h3>Deaths</h3>
            </div>
            {
            top20.map((item) => (
                <Row country={item.country} population={item.population} confirmed={item.confirmed} deaths={item.deaths} flag={item.abbreviation} />
            ))}
            
        </div>
    )
}

export default Dashboard
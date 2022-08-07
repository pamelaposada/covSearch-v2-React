import './Dashboard.css'
import {MapContainer, GeoJSON, Popup, LayerGroup} from "react-leaflet"
import countriesData from '../data/countries.json'
import { createRef, useEffect, useRef, useState } from 'react'
import Row from './dashboardComponents/Row'
import Loading from '../UI/Loading'




function Dashboard(){
    const geoJsonData = countriesData.features
    const [countryName, setCountryName] = useState(null)
    const [worldCases, setWorldCases] = useState([])
    const [countryMatch, setCountryMatch] = useState(null)
    const [top20, setTop20] = useState([])
    const [btnFilter, setBtnFilter] = useState(null)
    const [geoDataTest, setGeoDataTest] = useState([])
   
    const geoJsonLayer = createRef()

    console.log(countryName)
    // console.log(worldCases)
    console.log(geoJsonData)
    console.log(countryMatch)
    // console.log(countryObject)
    // console.log(top20)
    // console.log(btnFilter)

    // Map style
    const countryStyle = {
        fillColor: "#3f27da",
        fillOpacity: 1,
        color: "#181924",
        weight: 1,
    }
    
 

  
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
    
    console.log(countryMatch)

    // MapClick functions
    const selectCountry = (e) => {
        setCountryName(e.target.feature.properties.ADMIN)     
    }

    const tryFunction = (e)=> {
        e.target.setStyle({
            fillColor: "#902222"
        })
    }
    const tryFunctionTwo = (e)=> {
        e.target.setStyle({
            fillColor: "#3f27da"
        })
    }

    // useEffect(()=> {
    //     if(geoJsonLayer.current){
    //         geoJsonLayer.current.clearLayers().addData(geoJsonData)
    //     }
    // },[geoJsonData, geoJsonLayer])
    
    
    function onEachCountry(countryNameData, layer) {        
        const getCountryName = countryNameData.properties.ADMIN

        layer.bindPopup(`<center>${getCountryName}</center> <br />
        Cases : ${countryMatch} `)

        layer.on('mouseover', tryFunction)
        layer.on('mouseout', tryFunctionTwo)
       
        layer.on({
            click: selectCountry,
            // mouseover: changeColor,
        })
    }
    
    useEffect(()=> {
        const handleCountryClick = () => {
            if(Object.keys(worldCases).length && countryName != null){
                console.log("yes")
         
                const findCountry = (Object.entries(worldCases).find(item=> item[0] === countryName)) 

                if (findCountry !== undefined){
                    const NumCases = findCountry[1].All.confirmed
                    console.log(NumCases)
                    setCountryMatch(NumCases)
                }
                else if(findCountry === undefined && countryName === "United States of America"){
                    const NumCases = worldCases.US.All.confirmed
                    console.log(NumCases)
                    setCountryMatch(NumCases)
                }
                else{
                    const NumCases = 'Unknown'
                    console.log(NumCases)
                    setCountryMatch(NumCases)
                }

                console.log(findCountry)       
                // setCountryObject(findCountry[1].All)

                const geoJsonCountry = geoJsonData.map(item=>item.properties.ADMIN)
                // console.log(countryListArray)
                // console.log(geoJsonCountry)
                
            }else{
                console.log("nope")
            }
        }
        if(Object.keys(worldCases).length){
            handleCountryClick()
        }
        
    },[countryName, geoJsonData, worldCases])


    // Country List Top20 - Btns
    useEffect(()=>{
        const arraysize = 21
        const top20Countries = ()=>{

            if(Object.keys(worldCases).length){
                const filterCountryData = Object.values(worldCases).map(item =>item.All)
    
                if(btnFilter === null || btnFilter === "highest"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.confirmed - a.confirmed)).slice(1, arraysize)
                    setTop20(sortedArray)
                }
                else if(btnFilter === "lowest"){
                    const sortedArray = filterCountryData.sort((a , b)=>(a.confirmed - b.confirmed)).slice(13, arraysize + 12)
                    setTop20(sortedArray)
                }
                else if(btnFilter === "population"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.population - a.population)).slice(0, arraysize - 1)
                    setTop20(sortedArray)
                }
                else if(btnFilter === "deaths"){
                    const sortedArray = filterCountryData.sort((a , b)=>(b.deaths - a.deaths)).slice(1, arraysize)
                    setTop20(sortedArray)
                }
            }
        }
        if(Object.keys(worldCases).length ){
            top20Countries()
        }
    },[btnFilter, worldCases])

    function handleBtnsFilter(e) {
        e.preventDefault()
        console.log(e.target.value)
        setBtnFilter(e.target.value)
    }

    if(worldCases === []){
        return <Loading/>
    }
 
    return(
        <div className='dashboard-page'>
            <h1>World Covid-19 Cases</h1>
        
            <div className='map-div'>
                <MapContainer center={[30, 10]} zoom={1} minZoom={2} maxZoom={4} dragging={true} zoomControl={false} >
                    <GeoJSON 
                    data={countriesData.features} 
                    style={countryStyle}
                    onEachFeature={onEachCountry}
                    // ref={geoJsonLayer}
                    key={countryMatch}
                
                    />
 
                    
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
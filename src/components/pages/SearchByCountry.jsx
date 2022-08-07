import './SearchByCountry.css'
import { Autocomplete } from './Autocomplete'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import SearchUs from './searchComponents/SearchUs'

import BarChart from './searchComponents/BarChart'
import BarComparisonChart from './searchComponents/BarComparisonChart'
import Loading from '../UI/Loading'

library.add(faMagnifyingGlass)

function SearchByCountry(){

    const [country, setCountry] = useState(null)
    const [requestUserInput, setRequestUserInput]= useState(null)
    const [rowData, setRowData] = useState(null)
    const [dataSelection, setDataSelection] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    
    const countRenders = useRef(0)

    // Chart style
    const onHideStyle = dataSelection.length === 0 ? {display: "none"} : {display: "block"}
    
    // Error message
    const countryList = rowData !== null ? Object.entries(rowData).map(item => item[1].Country_Region) : []

    const inputErrorStyle = countryList.includes(requestUserInput) || requestUserInput === null ? {display: "none"} :{display: "block"}



    // console.log(countryList)
    console.log(rowData)
    console.log(requestUserInput)
    console.log(dataSelection)
    console.log(inputErrorStyle)
    console.log(country)


    const saveUserInput = (e) => {
        if (e.target.value === "united states" || e.target.value === "us" ){
            setCountry("US")
        }
        else{
            setCountry(e.target.value)
        }
    }
    
    // Handle user Input
    const handleCountryRequest = (e) => {
        e.preventDefault()

        // Capitalize string
        if(/\s/.test(country) === true){
            const countryArray1 = country.split(" ")
            for (let i= 0; i < countryArray1.length; i++){
                countryArray1[i] = countryArray1[i].charAt(0).toUpperCase() + countryArray1[i].slice(1)
            }
            const countryArray2 = countryArray1.join(" ")
            setRequestUserInput(countryArray2)
        }

        else if (/\s/.test(country) === false){
            const countryString = country.charAt(0).toUpperCase()+ country.slice(1)
            console.log(countryString)
            setRequestUserInput(countryString)
        }
    }


   useEffect(()=> {
      // count the number of renders
        // countRenders.current = countRenders.current + 1
        const fetchCountryData = async ()=> {
            try{
                const url = `https://coronavirus.m.pipedream.net`
                const response = await fetch(url)
                const data = await response.json();
                setRowData(data.rawData)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchCountryData()
     }, [])

     useEffect(()=>{

        if(requestUserInput !== null && requestUserInput === "US"){
            console.log("mami")
            // All US
            // const filterSeach = Object.entries(rowData).filter(item=> item[1].Country_Region === requestUserInput)
            // console.log(filterSeach)

            // By Province
            // const filterByProvince = filterSeach.filter(item=> item[1].Province_State === "Alabama")
            // console.log(filterByProvince)
 
        }

        if(requestUserInput !== null && requestUserInput !== "US"){
            const filterSeach = Object.entries(rowData).filter(item=> item[1].Country_Region === requestUserInput)
            console.log(filterSeach)
            setDataSelection(filterSeach)
        }

     },[requestUserInput, rowData])

     if(rowData === null){
        return <Loading/>
     }

    return(
        <div className='serachByCountry-div'>
            <div className="search-part">
                <h1>Search By Country</h1>
            </div>
            <div className="search-section">
                <div id="autocomplete">
                    <input className="user-input" onChange={saveUserInput}></input>
                </div>
                {/* <Autocomplete/> */}
                    <button type="button" className="submit-btn" onClick={handleCountryRequest}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass search-size" />
                    </button> 
                    <div className="input-error" style={inputErrorStyle}>
                        <p className="error-msg-text">Wrong country. Try again</p>
                    </div>
            </div>
                <div className='dynamic-style' style={onHideStyle}>
                    <BarChart chartData={dataSelection}/> 
                    <BarComparisonChart comparisonData ={dataSelection}/> 
                </div>

        </div>
    )
}

export default SearchByCountry
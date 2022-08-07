import './Row.css'


function Row(props){
    // console.log(props.key)

    const handleFlagError = props.flag !== undefined ? 
    require(`../../../images/flags/${props.flag}.png`): 
    require(`../../../images/flags/_unknown.png`)

    return(
        <div className='row'>
            <div className='country-container row-item'>
                <img src={handleFlagError} alt="country flag"></img>
                <p className='row-country'>{props.country}</p>
            </div>
            <div className='row-item'><p >{props.population}</p></div>
            <div className='row-item'><p >{props.confirmed}</p></div>
            <div className='row-item'><p >{props.deaths}</p></div>
        </div>
        
    )
} 

export default Row
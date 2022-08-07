import "./Home.css"
import {Link} from 'react-router-dom'


function Home(){
    return(
      <div>
        <div id="first-part" className="first-part first-part-index">
            <h1>Welcome to CovSearch</h1>
        </div>
        <div className="start-seach-section">
            <div className="intro-index">
                <h6>Find Covid-19 Cases Around the World</h6>
                <p>Covsearch is a web application that allows you to search for Covid-19 cases around the world. By using Covsearch, you can get an updated Covid-19 overview for any country in the world, check their total cases, total deaths, and copare covid-19 cases between countries around the world. You only need to start a new search and type the country name on the search bar.</p>
                <Link className="bt-start-search" to="/search">Start Search</Link>
            </div>

        </div>
      </div>
    )
}

export default Home
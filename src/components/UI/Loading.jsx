import logo from "../../images/logo.svg"
import "./Loading.css"

function Loading() {


    return(
        <div className="loading-main">

            <div className="objects-box">
                <img src={logo} alt="Loading" className="logo-loading"/>
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loading
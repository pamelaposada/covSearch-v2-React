import "./NotFound.css"
import logo from "../images/logo.svg"

function NotFound(){
    return(
        <div className="main-notfound">
            <img src={logo} alt="logo"/>
            <h1>Oops! Page Not Found!</h1>
            
        </div>
    )
}

export default NotFound
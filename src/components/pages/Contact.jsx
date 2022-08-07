import './Contact.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelopeCircleCheck, faPhoneFlip, faMapLocationDot} from '@fortawesome/free-solid-svg-icons'



library.add(faEnvelopeCircleCheck, faPhoneFlip, faMapLocationDot)

function Contact(){
    return(
        <div>
             <div id="first-part" className="first-part contact-pic ">
                <h1>Contact Us</h1>
            </div>

            <div className="start-seach-section">
                <div className="intro-index contact-section">
                    <h6>Send Us Your Enquiries and suggestions to:</h6>
                    <p> <FontAwesomeIcon icon="fa-solid fa-envelope-circle-check" /> somemail@covsearch.com</p>
                    <p> <FontAwesomeIcon icon="fa-solid fa-phone-flip" /> Some phone number: 61 111110000</p>
                    <p> <FontAwesomeIcon icon="fa-solid fa-map-location-dot" /> Australia</p>

                </div>
            </div>
        </div>
    )
}

export default Contact
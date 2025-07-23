import { Link } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OutgoingMailIcon from '@mui/icons-material/OutgoingMail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const Base = ()=>{
    return<>
       <footer className="bg-body-secondary p-4">
        <div className="row">
            <div className="col-sm-6 col-md-4 "> 
                <img className="img-fluid" src="images/2.png" alt="Logo"/>
                <br/>
             
            </div>
            <div className="col-sm-6 col-md-4 "> 
                <h4 className="fw-bold text-decoration-underline ">Quick Link</h4>
                <ul >
                    {/* <li className="list-group-item"><Link to="/" className="text-decoration-none fw-bold text-secondary">Contact</Link></li>
                    <li className="list-group-item"><Link to="/" className="text-decoration-none fw-bold text-secondary">About</Link></li>
                    <li className="list-group-item"><Link to="/" className="text-decoration-none fw-bold text-secondary">About</Link></li>
                    <li className="list-group-item"><Link to="/" className="text-decoration-none fw-bold text-secondary">Contact</Link></li> */}
                </ul>
            </div>
            <div className="col-sm-6 col-md-4 ">
               <h4>
                 Contact US
                </h4>   
                <h6 className="fw-bold text-secondary">
                   <LocalPhoneIcon /> Phone: <span  className="p-3 fw-light">999-888-xxxx</span>
                </h6>
                <h6 className="fw-bold text-secondary">
                 <OutgoingMailIcon />   Gmail  : <span className="p-3 fw-light">devendrakus2003@gmail.com</span>
                </h6> 
                 <h6 className="fw-bold text-secondary">
                  <LinkedInIcon />  Linkdin  : <span className="p-3 fw-light">Devendra-kushwah</span>
                </h6> 
             </div>
            
        </div>
       </footer>
    </>
}


export default Base;
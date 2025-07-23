import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function Auth({children}){
  const {login} = useSelector((store)=>store.LoginToken); 
  if(login)    
     return children;
   else
    return <Navigate to="/sign-in"/> 
}

export default Auth;
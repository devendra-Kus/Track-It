import "bootstrap-icons/font/bootstrap-icons.css";
import "./Batch.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Apis from "../../../Apis";

const Delete = ()=>{
 const {token} = useSelector((store)=>store.LoginToken); 
    const [batchName, setBatchName] = useState("");
  
    const handleDelete = async (e) => {
          e.preventDefault();
    try{
      let response = await axios.delete(`${Apis.ADMIN_Delete_BATCH}/${batchName}` , {headers:{Authorization:`Bearer ${token}`}});
      if(response.status===200)
         console.log("delete");
    }
    catch(err){
        console.log(err);
    }
  }; 
    return <>
       <div className="mainContent">
        <div className="container bg-danger-subtle p-4 " style={{width:"600px",borderRadius:"10px"}}>
              <h2 className="pt-2 ">Delete One User</h2>
           <form onSubmit={handleDelete}>
             <div>
                <label>Batch name</label>
                <input onChange={(event)=>{setBatchName(event.target.value)}} className="form-control" type="text" placeholder="Enter the batch name" required />
            </div>
           
            <div className="mt-3">
                <button type="submit" className="btn btn-outline-danger form-control"> Delete user</button>
            </div>
           </form>
        </div>
    
       </div>
    </>
}

export default Delete;
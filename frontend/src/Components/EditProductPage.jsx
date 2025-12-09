import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditProductPage() {
  
   /////////////ADDING THIS TO CHECK AUTHORIZATION
    const [currentUser, setCurrentUser] = useState(() => {
          const jwtToken = Cookies.get("jwt-authorization");
          if(!jwtToken){
              return ""; 
          }
          try{
              const decodedToken = jwtDecode(jwtToken);
              return {
                username: decodedToken.username,
                //Added to determine isAdmin will allow admin access or general user access below
                isAdmin: decodedToken.isAdmin,
              };
          } catch {
              return "";
          }
      });
  
      const navigate = useNavigate();
      const location = useLocation();
      console.log(location);
      useEffect(() => {
          if(!currentUser || !currentUser.isAdmin){
              navigate("/not-authorized");
          }
      },[currentUser, navigate]);
  
    /////////
  
  return (
    <div>
      <h1>Edit Product</h1>
    </div>
  );
}

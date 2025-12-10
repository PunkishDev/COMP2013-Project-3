import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      return "";
    }
    try {
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
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/not-authorized");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Add A New Product</h1>
    </div>
  );
}

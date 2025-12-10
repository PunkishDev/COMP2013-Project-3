import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
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
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      /*
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      */
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((result) => {
            setPostResponse(result.data);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      /*
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
      */
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <p>As of right now, this feature is incomplete.</p>
      <p>the product form is commented out so no one can attempt to use it.</p>
      <p>
        I need to rewatch the cookies lecture so i know how to grab the formdata
      </p>
      <p>
        I also need to remove the code that only runs when IsEdting is false
      </p>
      <p>i'll just set it to true and won't change it.</p>
      <p>and i need to modify the onSubmit function so there's no ref</p>
      {/*<ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />*/}
      <br />
      <br />
      <br />
      <Link to="/main">return to main page</Link>
    </div>
  );
}

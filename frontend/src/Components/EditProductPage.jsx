import ProductForm from "./ProductForm";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
export default function EditProductPage() {
  /////////////ADDING THIS TO CHECK AUTHORIZATION

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
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/not-authorized");
    } /*else if (!location.state) {
      navigate("/main");
    }*/
  }, [currentUser, navigate]);

  /////////
  const stateFormData = location.state;
  const [postResponse, setPostResponse] = useState("");
  const isEditing = true;
  const [formData, setFormData] = useState({
    productName: stateFormData.productName,
    brand: stateFormData.brand,
    image: stateFormData.image,
    price: stateFormData.price,
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      handleUpdateProduct(stateFormData._id);
    } catch (error) {
      console.log(error.message);
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
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />
      <br />
      <br />
      <br />
      <Link to="/main">return to main page</Link>
    </div>
  );
}

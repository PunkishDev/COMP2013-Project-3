import ProductForm from "./ProductForm";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function EditProductPage() {
  const navigate = useNavigate();
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

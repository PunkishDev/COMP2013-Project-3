import ProductForm from "./ProductForm";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function AddProductPage() {
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
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

  return (
    <div>
      <h1>Add A New Product</h1>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={false}
      />
      <br />
      <br />
      <br />
      <Link to="/main">return to main page</Link>
    </div>
  );
}

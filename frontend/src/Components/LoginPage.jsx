import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";

export default function LoginPage(){
  //states
  const [formData, setFormData] = useState({username: "", password: ""});
  const [postResponse, setPostResponse] = useState("");

  const navigate = useNavigate();

  //handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
        return{...prevData, [e.target.name]:e.target.value};
    });
  };

  const handleLogin = async() => {
    try {
        const response = await axios.post("http://localhost:3000/", {
            ...formData,
        });
        setPostResponse(response.data.message);
        if(response.status === 201)
        {
            navigate("/main");
        }
    } catch (error) {
        setPostResponse(
            error?.response?.data?.message || "login failed"
);
      }
  }

  const handleOnSubmit = (e) => {
      e.preventDefault();
      handleLogin();
      setFormData({
          username: "",
          password: "",

      });
  };
  return <div>
      <FormComponent formData={formData} postResponse={postResponse} handleOnsubmit={handleOnSubmit} handleOnChange={handleOnChange} nextPage="create-user" currentPage=""/>

  </div>

}

//referenced from lectures and previous code
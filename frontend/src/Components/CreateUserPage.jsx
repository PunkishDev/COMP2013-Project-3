import FormComponent from "./FormComponent";
import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
//import { useRoutes } from "react-router-dom";
export default function CreateUserPage() {
//states
const[formData, setFormData] = useState({username: "", password: "", isAdmin: false});
const [postResponse, setPostResponse] = useState("");

const navigate = useNavigate();

//handlers
const handleOnChange = (e) => {
    setFormData((prevData) => {
        return{...prevData, [e.target.name]:e.target.value};
    });
};

//one specifically for the checkbox
const handleOnChecked = (e) => {
    setFormData((prevData) => {
        return{...prevData, isAdmin: e.target.checked};
    });
};
const handleRegister = async (e) => {
  e.preventDefault(); //hopefully going to stop the error messages not showing up for the user
    try {
        const response = await axios.post("http://localhost:3000/create-user", {
            ...formData,
        })
        setPostResponse(response.data.message);
        if(response.status === 200)
        {
            navigate("/");
        }
    }catch(error){
        console.log(error);
        setPostResponse(error.response?.data?.message || "Something went wrong"); //after so long the error
        //was because i wasnt passing the post response through so when it went to output it it didnt
    }
}

const handleOnSubmit = (e) => {
    e.preventDefault(); 
    handleRegister(e); //passes so that errors can be seen
    setFormData({username: "", password: "", isAdmin: false});
} 
return (
    <div>
    <FormComponent formData={formData} 
    handleOnChange={handleOnChange} 
    handleOnsubmit={handleOnSubmit} 
    handleOnChecked={handleOnChecked}
    currentPage="create-user"
    nextPage="/" 
    postResponse={postResponse}
    />

    </div>
);
}

//referenced from lecture and previous code
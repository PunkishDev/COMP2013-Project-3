import FormComponent from "./FormComponent";
import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
//import { useRoutes } from "react-router-dom";
export default function CreateUserPage() {
    //states
    const[formData, setFormData] = useState({username: "", password: ""});
    const [postResponse, setPostResponse] = useState("");

    const navigate = useNavigate();

    //handlsers
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return{...prevData, [e.target.name]:e.target.value};
        });
    };

    const handleRegister = async () => {
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
        }
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleRegister();
        setFormData({username: "", password: ""});
    }
    return (
        <div>
        <FormComponent formData={formData} 
        handleOnChange={handleOnChange} 
        handleOnsubmit={handleOnSubmit} 
        currentPage="create-user"
        nextPage="/" 
        postResponse={postResponse}
        />

        </div>
    );
}

//referenced from lecture and previous code
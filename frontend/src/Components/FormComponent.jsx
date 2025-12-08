import { useNavigate } from "react-router-dom";
export default function FormComponent({
    formData, 
    handleOnsubmit, 
    handleOnChange, 
    currentPage, 
    nextPage, 
    postResponse
}){
    const navigate = useNavigate();
    return (<div>
        <h1>{currentPage}</h1>
        <form onSubmit={handleOnsubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" value={ formData.username } onChange={handleOnChange}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" value={ formData.password } onChange={handleOnChange}/>
            <br/>
            <button>Submit</button>
        </form>
        <p>{postResponse}</p>
        <button onClick={() => navigate(`/${nextPage}`)}>{nextPage === "login" ? "go to login page" : "go to register page"}</button>

    </div>
        );
}

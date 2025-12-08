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
        <h1>{nextPage === "/" ? "Create a new User" : "Groceries App"}</h1>
        <form onSubmit={handleOnsubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" value={ formData.username } onChange={handleOnChange}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" value={ formData.password } onChange={handleOnChange}/>
            <br/>
            <button onClick={() => navigate(`/${nextPage}`)}>{nextPage === "/" ? "Register" : "Login"}</button>
        </form>
        <p>{postResponse}</p>
         {/* <button onClick={() => navigate(`/${nextPage}`)}>{nextPage === "" ? "Go to login page" : "Go to register page"}</button>*/}
       <p>{nextPage === "/" 
       ? "Already a member get back to the home page " 
       : "Not a member? Please Register " } 
        {/*seperate link from the question asking if you are a member or if you already are */}
       {nextPage === "/" 
       ?  <a href={nextPage}>Here</a> 
       : <a href={nextPage}>Here</a>} </p>
    </div>
        );
        
}

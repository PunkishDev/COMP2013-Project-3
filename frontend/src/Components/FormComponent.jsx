import { useNavigate } from "react-router-dom";
export default function FormComponent({
  formData,
  handleOnsubmit,
  handleOnChange,
  handleOnChecked,
  currentPage,
  nextPage,
  postResponse,
}) {
  //const navigate = useNavigate();
  return (
    <div>
      <h1>{nextPage === "/" ? "Create a new User" : "Groceries App"}</h1>
      <form onSubmit={handleOnsubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        {/* using the same method for seeing what page the user is on*/}
        {nextPage === "/" ? (
          <label htmlFor="isAdmin">Are you an admin?: </label>
        ) : (
          ""
        )}
        {nextPage === "/" ? (
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            checked={formData.isAdmin}
            onChange={handleOnChecked}
          />
        ) : (
          ""
        )}
        <br />
        {/* this is giving error of changing page before displaying error to user*/}
        {/*<button onClick={() => navigate(`${nextPage}`)}>{nextPage === "/" ? "Register" : "Login"}</button>*/}
        <button type="submit">{nextPage === "/" ? "Register" : "Login"}</button>
      </form>
      <br />
      <p>{postResponse}</p>
      <br />
      {/* <button onClick={() => navigate(`/${nextPage}`)}>{nextPage === "" ? "Go to login page" : "Go to register page"}</button>*/}
      <p>
        {nextPage === "/"
          ? "Already a member get back to the home page "
          : "Not a member? Please Register "}
        {/*seperate link from the question asking if you are a member or if you already are */}
        {/*just realized this might not be necessary to check for but idk keeping it as it works lol*/}
        {nextPage === "/" ? (
          <a href={nextPage}>Here</a>
        ) : (
          <a href={nextPage}>Here</a>
        )}{" "}
      </p>
    </div>
  );
}

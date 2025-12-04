import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import PageNotFound from "./Components/PageNotFound";
import LoginPage from "./Components/LoginPage";
import CreateUserPage from "./Components/CreateUserPage";
import AddProductPage from "./Components/AddProductPage";
import EditProductPage from "./Components/EditProductPage";
import NotAuthorizedPage from "./Components/NotAuthorizedPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/main" element={<GroceriesAppContainer />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import Cookies from "js-cookie";
import { Navigate, Link } from "react-router-dom";

export default function NavBar({ quantity, isAdmin, currentUser }) {
  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    Navigate("/");
  };

  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {currentUser}</h3>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>

      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
      {isAdmin && (
        <button>
          <Link to="/add-product">Add A Product</Link>
        </button>
      )}
    </nav>
  );
}

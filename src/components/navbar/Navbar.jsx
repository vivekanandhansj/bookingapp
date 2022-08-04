import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">bookyourhotel</span>
        </Link>
        {user ? <button onClick={handleLogout} className="navButton" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{user.username} {isHovering && <p>Logout</p>}</button> : (
          <div className="navItems">
            <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Register</span>
        </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Login</span>
        </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

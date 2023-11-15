import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Cart from "../screens/Cart";
import Modal from '../Modal'
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();
  const [cartView,setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          Go Food
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li>
                <Link className="nav-link active fs-5" to="/myOrder">
                  My Orders
                </Link>
              </li>
            ) : (
              " "
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          ) :( 
            <div className="d-flex">
              <div className="btn bg-white text-success mx-2" to="/login" onClick = {() => setCartView(true)}>
                My Cart {"  "}
                <Badge pill bg="danger">{data.length}</Badge>
                
              </div>
              {cartView ? <Modal onClose = {() => setCartView(false)}><Cart/></Modal> : ""}
              <div
                className="btn bg-white text-danger mx-2"
                to="/createuser"
                onClick={handleLogOut}
              >
                
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

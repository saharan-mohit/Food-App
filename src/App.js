import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MyOrder from "./screens/MyOrder";
import { CartProvider } from "./components/ContextReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<SignUp />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </Router>
      </CartProvider>

      {/* <div> <Home></Home> </div> */}
    </div>
  );
}

export default App;

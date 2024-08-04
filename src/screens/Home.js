import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Link } from "react-router-dom";



export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodcat] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFoodItem(data[0]);
        setFoodcat(data[1]);
      } else {
        console.error("Failed to fetch:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleControls"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"  
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="/amirali-mirhashemian-sc5sTPMrVfk-unsplash.jpg"
                  style={{ filter: "brightness(30%)" }}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="/ivan-torres-MQUqbmszGGM-unsplash.jpg"
                  style={{ filter: "brightness(30%)" }}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="/vasylyna-kucherepa-CF2whFLtkiE-unsplash.jpg"
                  style={{ filter: "brightness(30%)" }}
                  alt="Third slide"
                />
              </div>
            </div>
            <Link
              className="carousel-control-prev"
              to="#carouselExampleControls"
              role="button"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </Link>
            <Link
              className="carousel-control-next"
              to="#carouselExampleControls"
              role="button"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr></hr>
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItem={filterItems} options={filterItems.options[0]}></Card>
                        </div>
                      );
                    })
                ) : (
                  <div></div>
                )}
              </div>
            );
          })
        ) : (
          <div>" "</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

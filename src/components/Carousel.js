import React from 'react'
import {Link} from 'react-router-dom'
export default function Carousel() {
  return (
    <div>
    <div id="carouselExampleControls" className="carousel slide carousel-fade" data-ride="carousel" style = {{objectFit : "contain !important"}}>
    <div className="carousel-inner" id = 'carousel'>
        <div className = "carousel-caption" style = {{zIndex : "10"}}>
        <form className="d-flex">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
         </form>
        </div>
        <div className="carousel-item active">
        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?burger" style = {{"filter" : "brightness(30%)"}}  alt="First slide"/>
        </div>
        <div className="carousel-item">
        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?pastry" style = {{"filter" : "brightness(30%)"}}  alt="Second slide"/>
        </div>
        <div className="carousel-item">
        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?barbeque" style = {{"filter" : "brightness(30%)"}}  alt="Third slide"/>
        </div>
    </div>
    <Link className="carousel-control-prev" to="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        {/* <span className="sr-only">Previous</span> */}
    </Link>
    <Link className="carousel-control-next" to="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        {/* <span className="sr-only">Next</span> */}
    </Link>
    </div>
    </div>
  )
}

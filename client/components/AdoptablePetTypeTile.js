import React from "react"
import _ from "lodash"
import { Link } from "react-router-dom"

const AdoptablePetTypeTile = ({ id, petType, imgUrl, name, age, vaccinationStatus }) => {
  let isVaccinated = "No"
  if (vaccinationStatus) {
    isVaccinated = "Yes"
  }
  return (
    <div className="cell small-12 medium-6 large-3">
      <div className="single-pet-card-container">
        <h2 className="text-center single-pet-card-name">
          <Link to={`/pets/${petType}/${id}`}>{name}</Link>
        </h2>

        <div className="single-pet-img">
          <Link to={`/pets/${petType}/${id}`}>
            <img src={imgUrl} />
          </Link>
        </div>
        <div className="single-pet-info">
          <p>Age: {age}</p>
          <p>Vaccination Status: {isVaccinated}</p>
        </div>
      </div>
    </div>
  )
}

export default AdoptablePetTypeTile

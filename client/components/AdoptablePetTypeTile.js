import React from "react"
import { Link } from "react-router-dom"

const AdoptablePetTypeTile = ({ id, petType, imgUrl, name, age, vaccinationStatus }) => {
  let isVaccinated = "No"
  if (vaccinationStatus) {
    isVaccinated = "Yes"
  }
  return (
    <div>
      <Link to={`/pets/${petType}/${id}`}>
        <img src={imgUrl} />
        <h2>{name}</h2>
      </Link>
      <p>Age: {age}</p>
      <p>{isVaccinated}</p>
    </div>
  )
}

export default AdoptablePetTypeTile

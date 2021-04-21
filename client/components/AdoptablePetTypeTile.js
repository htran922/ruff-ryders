import React from "react"

const AdoptablePetTypeTile = ({ imgUrl, name, age, vaccinationStatus }) => {
  let isVaccinated = "No"
  if (vaccinationStatus) {
    isVaccinated = "Yes"
  }
  return (
    <div>
      <img src={imgUrl} />
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>{isVaccinated}</p>
    </div>
  )
}

export default AdoptablePetTypeTile

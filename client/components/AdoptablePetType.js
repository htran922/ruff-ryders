import React, { useEffect, useState } from "react"
import AdoptablePetTypeTile from "./AdoptablePetTypeTile"

const AdoptablePetType = props => {
  const [adoptablePetType, setAdoptablePetType] = useState([])

  const getAdoptablePetType = async () => {
    try {
      const response = await fetch(`/api/v1/adoptable-pets/${props.match.params.type}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setAdoptablePetType(responseBody.adoptablePets)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    getAdoptablePetType()
  }, [])

  const adoptablePetTypeList = adoptablePetType.map(pet => {
    return (
      <AdoptablePetTypeTile
        key={pet.id}
        id={pet.id}
        petType={props.match.params.type}
        imgUrl={pet.imgUrl}
        name={pet.name}
        age={pet.age}
        vaccinationStatus={pet.vaccinationStatus}
      />
    )
  })
  return (
    <div>
      <h1 className="text-center">
        {_.capitalize(props.match.params.type)}
        {props.match.params.type === "fox" ? "es" : "s"}
      </h1>
      <div className="grid-x">
        {adoptablePetTypeList}
      </div>
    </div>
  )
}

export default AdoptablePetType

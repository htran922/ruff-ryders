import React, { useEffect, useState } from "react"
import AdoptablePetTypeTile from "./AdoptablePetTypeTile"

const AdoptablePetType = props => {
  const [adoptablePetType, setAdoptablePetType] = useState([])

  const { type } = props.match.params
  const getAdoptablePetType = async () => {
    try {
      const response = await fetch(`/api/v1/pet-types/${type}`)
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
  }, [type])

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
  return <>{adoptablePetTypeList}</>
}

export default AdoptablePetType

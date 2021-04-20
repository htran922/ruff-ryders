import React, { useEffect, useState } from "react"

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
    return <p key={pet.id}>{pet.name} </p>
  })
  return <>{adoptablePetTypeList}</>
}

export default AdoptablePetType

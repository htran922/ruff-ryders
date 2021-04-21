import React, { useState, useEffect } from "react"

const AdoptablePetTypeShow = props => {
  const [adoptablePet, setAdoptablePet] = useState({})
  const getAdoptablePet = async () => {
    const { type, id } = props.match.params
    try {
      const response = await fetch(`/api/v1/adoptable-pets/${type}/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setAdoptablePet(responseBody.adoptablePet)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getAdoptablePet()
  }, [])

  return (
    <div>
      <img src={adoptablePet.imgUrl} />
      <h1>{adoptablePet.name}</h1>
      <p>Age: {adoptablePet.age}</p>
      <p>Vaccinated: {adoptablePet.vaccinationStatus ? "Yes" : "No"}</p>
      <p>{adoptablePet.adoptionStory}</p>
    </div>
  )
}

export default AdoptablePetTypeShow

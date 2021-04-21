import React, { useState, useEffect } from "react"

const AdoptablePetTypeShow = props => {
  const [adoptablePet, setAdoptablePet] = useState({})

  const getAdoptablePet = async () => {
    try {
      const { type, id } = props.match.params
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
    <>
      <h1>{adoptablePet.name}</h1>
      <p>Age: {adoptablePet.age}</p>
      <p>Vaccinated: {adoptablePet.vaccinationStatus ? "Yes" : "No"}</p>
      <p>{adoptablePet.adoptionStory}</p>
    </>
  )
}

export default AdoptablePetTypeShow
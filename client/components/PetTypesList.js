import React, { useState, useEffect } from "react"
import PetTypeTile from "./PetTypeTile.js"

const PetTypesList = props => {
  const [petTypes, setPetTypes] = useState([])

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/pet-types")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setPetTypes(responseBody.petTypes)
    } catch (error) {
      console.error(`There was an error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getPetTypes()
  }, [])

  const allPetTypes = petTypes.map(type => {
    return (
      <PetTypeTile
        key={type.id}
        type={type.type}
        url={type.imgUrl}
        description={type.description}
      />
    )
  })

  return (
    <div>
      <h1 className="text-center">Ruff Ryders</h1>
      <h2 className="text-center">Helping people adopt pets</h2>
      <div className="grid-x">{allPetTypes}</div>
    </div>
  )
}

export default PetTypesList

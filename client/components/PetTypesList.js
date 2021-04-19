import React, { useState, useEffect } from "react"

const PetTypesList = props => {
  const [petTypes, setPetTypes] = useState({})

  const getPetTypes = async () => {
    try {
      const results = await fetch("/api/v1/pet-types")
    } catch (error) {}
  }

  return <h1>Hello from PetTypesList</h1>
}

export default PetTypesList

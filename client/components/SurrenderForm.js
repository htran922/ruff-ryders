import React, { useState, useEffect } from "react"
import _ from "lodash"
import ErrorList from './ErrorList'


const SurrenderForm = (props) => {
  const [newSurrenderedPet, setNewSurrenderedPet] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "",
    petImage: "",
    vaccinationStatus: ""
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState(null)
  const [petTypes, setPetTypes] = useState([])

  const addNewSurrender = async () => {
    try {
      const response = await fetch("/api/v1/surrenders", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newSurrenderedPet)
      })
      if (!response.ok) {
        const errorMessage = `${response.type} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      } else {
        const body = await response.json()
        handleFormSuccess()
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getPetTypes = async () => {
    try {

      const response = await fetch('/api/v1/pet-types')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()

      setPetTypes(body.petTypes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPetTypes()
  }, [])

  const handleChange = (event) => {
    setNewSurrenderedPet({
      ...newSurrenderedPet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validFormSubmission = () => {
    let submitErrors = {}

    const requiredFields = ['name', 'phoneNumber', 'email', 'petImage', 'petAge', 'petType', 'vaccinationStatus']
    requiredFields.forEach(field => {
      if (newSurrenderedPet[field].trim() === '') {
        submitErrors = {
          ...submitErrors,
          [field]: 'is blank'
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }
  const handleFormSuccess = () => {
    setSuccessMessage("Your surrender request is in process")

  }
  const handleSubmit = (event) => {

    event.preventDefault()
    if (validFormSubmission()) {
      addNewSurrender()
      setNewSurrenderedPet({
        name: "",
        phoneNumber: "",
        email: "",
        petName: "",
        petAge: "",
        petType: "",
        petImage: "",
        vaccinationStatus: ""
      })
    }
  }

  const petTypeList = petTypes.map(type => {
    return (
      <option key={type.type} value={type.type}>
        {type.type}
      </option>
    )
  })

  const vaccinationStatusArray = ['', 'Yes', 'No']

  const vaccinationStatusList = vaccinationStatusArray.map(vaccination => {
    return (
      <option key={vaccination} value={vaccination}>
        {vaccination}
      </option>
    )
  })

  return (
    <>
      <form onSubmit={handleSubmit}
      >
        <ErrorList errors={errors} />
        <h3>Surrender Application</h3>
        <p> We recognize making the decision to rehome your animal is not an easy decision. If there is anything we might be able to do to help you troubleshoot the situation you are facing please reach out to us. </p>

        <label htmlFor="name">
          Name:
        <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={newSurrenderedPet.name}
          />
        </label>

        <label htmlFor="phoneNumber">
          Phone Number:
        <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={newSurrenderedPet.phoneNumber}
          />
        </label>

        <label htmlFor="email">
          Email:
        <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={newSurrenderedPet.email}
          />
        </label>
        <label htmlFor="petName">
          Pet Name:
        <input
            id="petName"
            type="text"
            name="petName"
            onChange={handleChange}
            value={newSurrenderedPet.petName}
          />
        </label>
        <label htmlFor="petAge">
          Pet Age:
        <input
            id="petAge"
            type="number"
            name="petAge"
            min="0"
            onChange={handleChange}
            value={newSurrenderedPet.petAge}
          />
        </label>

        <label htmlFor="petType">
          Pet Type:
        <select
            id="petType"
            name="petType"
            onChange={handleChange}
            value={newSurrenderedPet.petType}>
            {petTypeList}
          </select>
        </label>

        <label htmlFor="petImage">
          Pet Image:
        <input
            id="petImage"
            type="text"
            name="petImage"
            onChange={handleChange}
            value={newSurrenderedPet.petImage}
          />
        </label>

        <label htmlFor="vaccinationStatus">
          Vaccination Status:
        <select
            id="vaccinationStatus"
            name="vaccinationStatus"
            onChange={handleChange}
            value={newSurrenderedPet.vaccinationStatus}>
            {vaccinationStatusList}

          </select>
        </label>
        <div>

          <input className="button" type="submit" value="Submit" />
          <div>{successMessage}</div>
        </div>
      </form>
    </>
  )
}

export default SurrenderForm

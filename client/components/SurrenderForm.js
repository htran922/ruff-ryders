import React, { useState } from "react"
import _ from "lodash"
//import ErrorList from './ErrorList'

const SurrenderForm = (props) => {
  const [newSurrenderedPet, setNewSurrenderedPet] = useState({
    name : "",
    phoneNumber:"",
    email : "",
    petName: "",
    petAge:"",
    petType: "",
    petImage: "",
    vaccinationStatus:"pending"
  })
  
  const [errors, setErrors] = useState({})
  const addNewSurrender = async () => {
    try {
      const response = await fetch("/api/v1/adoptions/new", {
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
        console.log("Posted successfully!", body);
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleChange = (event) => {
    setNewSurrenderedPet({
      ...newSurrenderedPet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validFormSubmission = () =>{
    let submitErrors = {}
    
    const requiredFields = ['name', 'phoneNumber', 'email']
    requiredFields.forEach(field =>{
      if(newSurrenderedPet[field].trim() === ''){
        submitErrors = {
          ...submitErrors,
          [field]: 'is blank'
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(validFormSubmission()){
      props.onFormSubmit(addNewSurrender())
    }
  }
  
  const petTypeArray = ['Cat', 'Dog', 'Fox']
  const petTypeList = petTypeArray.map(type => {
    return (
      <option key={type} value={type}>
        {type}
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
      <form onSubmit={handleSubmit} >
        <h3>Surrender Application</h3>
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
            type="text"
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
            type="text"
            name="vaccinationStatus"
            onChange={handleChange}
            value={newSurrenderedPet.vaccinationStatus}>
            {vaccinationStatusList}
          
        </select>
        </label>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}


export default SurrenderForm

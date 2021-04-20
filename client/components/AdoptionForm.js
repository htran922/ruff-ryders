import React, { useState } from "react"
import _ from "lodash"

import ErrorList from './ErrorList'

const AdoptionForm = props => {
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "",
    applicationStatus: "pending"
  })

  const handleChange = (event) =>{
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validFormSubmission = () =>{
    let submitErrors = {}

    const requiredFields = ['name', 'phoneNumber', 'email', 'homeStatus']
    requiredFields.forEach(field =>{
      if(formData[field].trim() === ''){
        submitErrors = {
          ...submitErrors,
          [field]: 'is blank'
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const onSubmitHandler = event =>{
    event.preventDefault()
    if(validFormSubmission()){
      props.onFormSubmit(formData)
    }
  }

  const clearForm = event =>{
    event.preventDefault()
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      homeStatus: ""
    })
    setErrors({})
  }

  const homeStatusArray = ['', 'Rent', 'Own']

  const homeStatusList = homeStatusArray.map(status =>{
    return(
      <option key = {status} value = {status}>
        {status}
      </option>
    )
  })

  return (
    <div>
      <h3>Adoption Form</h3>
      <form onSubmit={onSubmitHandler}>

        <ErrorList errors = {errors} />

        <label htmlFor="name">
          Name:
          <input name="name" id="name" type="text" onChange={handleChange} value={formData.name} />
        </label>

        <label htmlFor="phoneNumber">
          Phone Number:
          <input
            name="phoneNumber"
            id="phoneNumber"
            type="number"
            onChange={handleChange}
            value={formData.phoneNumber}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleChange}
            value={formData.email}
          />
        </label>

        <label htmlFor="homeStatus">
          Home Status:
          <select
            name="homeStatus"
            id="homeStatus"
            onChange={handleChange}
            value={formData.homeStatus}>
              {homeStatusList}
          </select>
        </label>

        <input type='submit' value="Apply" />
      </form>
    </div>
  )
}

export default AdoptionForm

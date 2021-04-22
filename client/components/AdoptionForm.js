import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import ErrorList from "./ErrorList"

const AdoptionForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "",
    applicationStatus: "pending",
    adoptablePetId: props.adoptablePetId
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const addNewAdoptionApplication = async () => {
    try {
      const response = await fetch("/api/v1/adoption-form", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const responseBody = await response.json()
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const validFormSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    requiredFields.forEach(field => {
      if (formData[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      addNewAdoptionApplication()
      props.onFormSubmit()
    }
  }

  const clearForm = event => {
    event.preventDefault()
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      homeStatus: ""
    })
    setErrors({})
  }

  if (shouldRedirect) {
    return <Redirect to={`/pets/${props.type}/${props.id}`} />
  }
  const homeStatusArray = ["", "Rent", "Own"]
  const homeStatusList = homeStatusArray.map(status => {
    return (
      <option key={status} value={status}>
        {status}
      </option>
    )
  })

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <ErrorList errors={errors} />
        <label htmlFor="name">
          Name:
          <input name="name" id="name" type="text" onChange={handleChange} value={formData.name} />
        </label>

        <label htmlFor="phoneNumber">
          Phone Number:
          <input
            name="phoneNumber"
            id="phoneNumber"
            type="text"
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
            value={formData.homeStatus}
          >
            {homeStatusList}
          </select>
        </label>

        <input type="submit" value="Apply" />
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
      </form>
    </>
  )
}

export default AdoptionForm

import React, { useState } from "react"

const AdoptionForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "",
    applicationStatus: "pending"
  })

  return (
    <div>
      <h3>Adoption Form</h3>
      <form>
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
          <input
            name="homeStatus"
            id="homeStatus"
            type="text"
            onChange={handleChange}
            value={formData.homeStatus}
          />
        </label>
      </form>
    </div>
  )
}

export default AdoptionForm

import React from "react"

const PetTypeTile = props => {
  let imgURL = props.url

  return (
    <li>
      <p>{props.type}</p>
      <img src={imgURL}></img>
      <p>{props.description}</p>
    </li>
  )
}

export default PetTypeTile

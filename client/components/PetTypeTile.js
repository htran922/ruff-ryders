import React from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

const PetTypeTile = props => {
  let imgURL = props.url

  return (
    <div>
      <Link to={`/pets/${props.type}`}>
        <h2>{_.capitalize(props.type)}</h2>
        <img src={imgURL} />
      </Link>
      <p>{props.description}</p>
    </div>
  )
}

export default PetTypeTile

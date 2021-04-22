import React from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

const PetTypeTile = props => {
  let imgURL = props.url

  return (
    <div id='padding' className="cell small-12 medium-4 large-4">
       <Link to={`/pets/${props.type}`}>
        <h2>{_.capitalize(props.type)}</h2>
        <p className = 'description'>{props.description}</p>
        <img src={imgURL} />
      </Link>
    </div>
   
  )
}

export default PetTypeTile

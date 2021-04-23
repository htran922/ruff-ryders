import React from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"

import PetTypesList from "./PetTypesList.js"
import AdoptablePetType from "./AdoptablePetType"
import AdoptablePetTypeShow from "./AdoptablePetTypeShow"
import SurrenderForm from "./SurrenderForm"

const NavBar = props => {
  return (
    <div className="navbar-container">
      <div className="menu-item">
        <Link to="/pets">Welcome Page</Link>
      </div>
      <div className="menu-item">
        <Link to="/pets/cat">Cats</Link>
      </div>
      <div className="menu-item">
        <Link to="/pets/dog">Dogs</Link>
      </div>
      <div className="menu-item">
        <Link to="/pets/fox">Foxes</Link>
      </div>
      <div className="menu-item">
        <Link to="/adoptions/new">Surrender Your Pet</Link>
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/pets" />
        </Route>
        <Route exact path="/pets" component={PetTypesList} />
        <Route exact path="/pets/:type" component={AdoptablePetType} />
        <Route exact path="/pets/:type/:id" component={AdoptablePetTypeShow} />
        <Route exact path="/adoptions/new" component={SurrenderForm} />
      </Switch>
    </div>
  )
}

export default NavBar

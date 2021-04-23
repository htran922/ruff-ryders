import React from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"

import PetTypesList from "./PetTypesList.js"
import AdoptablePetType from "./AdoptablePetType"
import AdoptablePetTypeShow from "./AdoptablePetTypeShow"
import SurrenderForm from "./SurrenderForm"

const NavBar = props => {
  return (
    <div>
      <nav className="top-bar sticky" data-sticky data-margin-top="0">
        <div className="top-bar-left">
          <div className="menu-item">
            <Link to="/pets">
              <div className="logo-container">
                <h1>Ruff Ryders</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="menu">
            <div className="menu-item">
              <Link to="/pets">Home</Link>
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
          </div>
        </div>
      </nav>

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

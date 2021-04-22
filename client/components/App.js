import React, { useEffect } from "react"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import PetTypesList from "./PetTypesList.js"
import AdoptablePetType from "./AdoptablePetType.js"
import SurrenderForm from "./SurrenderForm.js"
import AdoptablePetTypeShow from "./AdoptablePetTypeShow.js"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pets" />
        </Route>
        <Route exact path="/pets" component={PetTypesList} />
        <Route exact path="/pets/:type" component={AdoptablePetType} />
        <Route exact path="/surrenders/new" component={SurrenderForm} />
        <Route exact path="/pets/:type/:id" component={AdoptablePetTypeShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)

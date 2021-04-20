import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import PetTypesList from "./PetTypesList.js"
import AdoptionForm from "./AdoptionForm"

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"

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
        <Route exact path ="/adoptionForm" component = {AdoptionForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)

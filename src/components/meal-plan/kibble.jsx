import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import LoadingCircle from '../partials/loading'
import MealPlanSelect from './meal-plan-select'
import { userActions } from '../../actions'

const KibbleSelect = props => {
  if (!props.user.kibble_recipes) return <LoadingCircle />

  const { kibble_recipes } = props.user
  const recipeField = kibble_recipes.map((food, i) => (
    <Field
      key={i}
      component={MealPlanSelect}
      name='kibble'
      id='kibble'
      food={food}
      kibble={kibble_recipes}
    />
  ))
  return (
    <div>
      <div className="mb-6 text-xl">
        Kibble
      </div>
      {recipeField}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { user: { subscriptions, dogs }, user } = state
  let dog = dogs.length > 0 ? dogs[0] : {}
  return {
    subscriptions,
    dogs,
    user,
  }
}

export default connect(mapStateToProps)(KibbleSelect)

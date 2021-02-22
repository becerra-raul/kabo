import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import LoadingCircle from '../partials/loading'
import MealPlanSelect from './meal-plan-select'
import { userActions } from '../../actions'
import Modal from '../global/modal'
import { Button } from '../../stories/Button'
import _, { map } from 'underscore';
import beefIcon from '../../assets/images/recipe/beef-recipe.png'
import chickenIcon from '../../assets/images/recipe/chicken-recipe.png'
import lambIcon from '../../assets/images/recipe/lamb-recipe.png'
import turkeyIcon from '../../assets/images/recipe/turkey-recipe.png'


const MealIcon = ({ source, notFirst }) => (
  <img
    src={source}
    className={`h-12 rounded-full  ${notFirst && '-ml-10'}`}
    alt=""
  />
)

const ConfirmMeal = ({ dog, subs, onConfirm, cookedRecipes, kibble, portion, open, onClose, estimate, user }) => {
  if (!dog.chargebee_subscription_id) return null
  let cbID = dog.chargebee_subscription_id
  ////resolved this error subs.[cbID]
  let subData = subs[cbID]
  let totalReadable = (subData.invoice_estimate_total / 100).toFixed(2)
  const { cooked_recipes, kibble_recipes } = user
  let recipeArray = []
  let iconArray = []

  function findString(array, string) {
    let newArray = array.filter(word => word.includes(string))
    if (newArray.length == 0) return false
    else return true
  }
  if (findString(cookedRecipes, 'beef')) {
    recipeArray.push('Savoury Beef')
    iconArray.push(
      <MealIcon key="beef_recipe" notFirst={iconArray.length > 0} source={cooked_recipes[1].image_url} />
    )
  }
  if (findString(cookedRecipes, 'chicken ')) {
    recipeArray.push('Tender Chicken')
    iconArray.push(
      <MealIcon key="chicken_recipe" notFirst={iconArray.length > 0} source={cooked_recipes[0].image_url} />
    )
  }
  if (findString(cookedRecipes, 'lamb')) {
    recipeArray.push('Luscious Lamb ')
    iconArray.push(
      <MealIcon key="lamb_recipe" notFirst={iconArray.length > 0} source={cooked_recipes[3].image_url} />
    )
  }
  if (findString(cookedRecipes, 'turkey ')) {
    recipeArray.push('hearty Turkey')
    iconArray.push(
      <MealIcon key="turkey_recipe" notFirst={iconArray.length > 0} source={cooked_recipes[2].image_url} />
    )
  }
  if (kibble.length) {
    kibble.forEach(kib => {
      recipeArray.push(`${kib} kibble`)
    });
    iconArray.push(
      <MealIcon key="turkey_recipe" notFirst={iconArray.length > 0} source={kibble_recipes[0].image_url} />
    )
  }

  // let portion = ''

  // if (currentDog.portion === 100) {
  //   portion = 'Full meal'
  // } else {
  //   portion = `${portion}% Kabo`
  // }

  return (
    <Modal
      title="Edit Meal Plan Confirmation"
      isOpen={open}
      onRequestClose={() => onClose()}>
      <div className="grid md:grid-cols-2 grid-cols-1" >
        <div className="p-4">
          <div className="font-messina text-xl font-semibold">
            Please confirm meal plan updates
            <div className="flex">
              {iconArray}
              {recipeArray.join(`, `)}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => onConfirm()}
              className="bg-primary text-white rounded-xl font-semibold py-2 px-2 mt-8"
            >
              Save Changes
          </button>
          </div>
        </div>
        <div className="font-messina text-xl p-4">
          <div className="text-gray-400">
            You are currently paying: <br /> ${totalReadable}
          </div>
          <div className="font-semibold">
            You're new price will be <br /> {estimate && estimate.amount}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmMeal
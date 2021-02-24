import React, { Component } from 'react'
import Modal from '../global/modal'
import _, { map } from 'underscore';

const cookedRecipesObject = {
  "beef": { key: "beef_recipe", imageIndex: 1, title: "Savoury Beef"},
  "chicken": { key: "chicken_recipe", imageIndex: 0, title: "Tender Chicken"},
  "lamb": { key: "lamb_recipe", imageIndex: 3, title: "Luscious Lamb"},
  "turkey": { key: "turkey_recipe", imageIndex: 2, title: "hearty Turkey"},
}

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

  let subData = subs[cbID]
  ////resolved NaN
  let totalReadable = subData.invoice_estimate_total === "N/A"
      ? 0
      : (subData.invoice_estimate_total / 100).toFixed(2)
  const { cooked_recipes, kibble_recipes } = user
  let recipeArray = []
  let iconArray = []

  cookedRecipes.forEach(key => {
    if (key && cookedRecipesObject[key]) {
      recipeArray.push(cookedRecipesObject[key].title);
      iconArray.push(
          <MealIcon
              key={cookedRecipesObject[key].key}
              notFirst={iconArray.length > 0}
              source={cooked_recipes[cookedRecipesObject[key].imageIndex].image_url}
          />
      )
    }
  });

  if (kibble.length) {
    kibble.forEach(kib => {
      if (kib) {
        recipeArray.push(`${kib} kibble`)
      }
      iconArray.push(
          <MealIcon key="turkey_recipe" notFirst={iconArray.length > 0} source={kibble_recipes[0].image_url} />
      )
    });
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
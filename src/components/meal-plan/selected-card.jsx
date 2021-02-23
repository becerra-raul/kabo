import React, { useState, useEffect } from "react";
import OrderItemModal from "../order/order-item-modal";

const SelectedCard = ({
  type,
  food,
  icons,
  kibble,
  selectCookedFood,
  selectedCookedRecipes,
  selectKibbleRecipe,
  selected,
  selectedLength,
}) => {
  // return null
  if (!selectedCookedRecipes && !kibble) return null
  if (!selected) return null
  return (
    <div className=" w-full flex flex-row overflow-hidden justify-between">
      <div className="font-cooper text-black text-center messina text-base text font-semibold">
        {food.name} {type === 'kibble' && 'Kibble'}
      </div>
      <button
        onClick={type === "kibble" ? () => selectKibbleRecipe(food) : () => selectCookedFood(food)}
      >
        X
      </button>
    </div >
  );
};

export default SelectedCard;
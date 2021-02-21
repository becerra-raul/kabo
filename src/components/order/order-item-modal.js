import React from 'react';
import Modal from '../../components/global/modal';

export default function OrderItemModal({ item, showModal, onClose }) {
  return (
    <Modal
      title={item?.name + ' Meal Plan'}
      isOpen={showModal}
      onRequestClose={onClose}
    >
      <div className="p-6 overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div className="flex md:flex-row flex-col">
          <div className="w-full md:w-80 bg-chicken flex justify-center items-center py-6">
            <img src={item?.image_url} alt="recipe image" className="w-2/3" />
          </div>
          <div className="p-5 flex-col text-center md:text-left">
            <div className="font-cooper text-2xl mb-4 ">{item?.name}</div>
            <div className="text-sm mb-2">Ingredients</div>
            <div className="text-base font-semibold">{item?.ingredients}</div>
          </div>
        </div>
        <div className="flex flex-col items-center my-8">
          <div className="text-center text-sm mb-6">Guarantee analysis</div>
          {item &&
            item?.analysis &&
            item?.analysis?.map((one) => {
              return (
                <div className="grid grid-cols-2 gap:2 w-2/3 my-2">
                  <div className="font-semibold">{one[0]}</div>
                  <div className="font-semibold text-right">{one[1]}</div>
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
}

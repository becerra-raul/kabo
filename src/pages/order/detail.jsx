import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import visaIcon from "../../assets/images/visa-icon.png";


import OrderItemModal from '../../components/order/order-item-modal'


class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailModal: false,
      selItem: null
    }
  }

  getOrder = () => {
    const {
      match: { params },
      orders,
    } = this.props;

    const invoice = params.id;

    let one = orders.filter((one) => one.invoice_id == invoice);

    return one && one.length > 0 ? one[0] : null;
  };

  render() {
    const {
      match: { params },
    } = this.props;

    const { selItem } = this.state;

    let order = this.getOrder();
    if (!order) {
      return null;
    }

    return (
      <div className='container pb-40 bg-white'>
        <div className='flex items-center flex-col mt-10'>
          <div className='flex justify-center'>
            <div className='w-72 p-5 mx-2 rounded-xl'>
              <div className='text-2xl font-bold mb-1'>
                Order #{order.invoice_id}
              </div>
              <div className='text-sm font-semibold mb-2'>{order.total}</div>
              <div className='text-sm  mb-2 md-max-hidden'>{order.date}</div>
              <div className='text-sm  mb-2 md:hidden'>{order.date_mobile}</div>
              <div className=' flex justify-start mb-11 items-center'>
                <div className='text-sm '>{order.payment_status}</div>
                <img src={visaIcon} className='ml-2 mr-2'></img>
                <div className=' text-sm'>{order.card}</div>
              </div>

              <div className='text-2xl font-bold mb-2'>Items</div>
              {order.items.map((item, index) => {
                if (Object.keys(item).length === 0) return null
                return (
                  <div
                    key={index + ""}
                    className='rounded-md border border-gray-200'
                  >
                    <div className='rounded-md rounded-b-none flex justify-center bg-chicken'>
                      <img src={item.image_url} className='w-3/5 m-5'></img>
                    </div>
                    <div className='p-5 text-center'>
                      <div className='text-2xl'>{item.name}</div>
                      <div
                        className='text-primary text-xs font-bold cursor-pointer'
                        onClick={() => { this.setState({ selItem: item, showDetailModal: true }) }}
                      >
                        See Details
                      </div>
                      <div className='text-sm text-left mt-2'>
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <OrderItemModal item={selItem} showModal={this.state.showDetailModal} onClose={() => { this.setState({ showDetailModal: false }) }} />

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderData: () => dispatch(userActions.getOrderData()),
});

const mapStateToProps = (state) => {
  console.log("state in mapstate to props", state);
  const {
    user: { subscriptions, dogs, orders },
    user,
  } = state;

  return {
    subscriptions,
    user,

    orders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";

import { userActions, alertActions } from "../../actions";
import LoadingCircle from "../partials/loading";
import Input from "../global/input.jsx";
import Modal from "../global/modal";

import beefIcon from "../../assets/images/recipe/beef-100@2x.jpg";
import { ReactComponent as FilledCircle } from "../../assets/images/filled-circle.svg";

const test = {
  status: 0,
  recipe: "Savoury Beef and TEnder Chicken",
  price: "$28",
  portion: "full Meal",
  recommended: "$12",
  planLength: 2,
};

class PwdModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: "",
      repwd: "",
    };
  }

  onSave = () => {
    this.props.updatePassword(this.state.pwd, this.state.repwd);
  };

  onPwdChange = (e) => {
    const val = e.target.value;
    this.setState({ pwd: val });
  };

  onRePwdChange = (e) => {
    const val = e.target.value;
    this.setState({ repwd: val });
  };

  render() {
    const {
      showModal,
      onCloseModal,
      pwd_alert,
      pwd_update_success,
    } = this.props;

    let alertClass =
      pwd_update_success === true
        ? "mb-4 text-green-600  text-sm"
        : "mb-4 text-red-500 text-sm";

    if (pwd_update_success === true) {
      setTimeout(() => {
        this.props.alertClear();
        this.props.onCloseModal();
      }, 2000);
    }

    return (
      <>
        <Modal // pausebox success
          title='Change Password'
          isOpen={showModal}
          onRequestClose={() => {
            onCloseModal();
          }}
        >
          <div className='py-6 px-16'>
            <div className='flex items-center flex-col mb-4'>
              <div className='w-full p-6 bg-promptYellow rounded-1lg'>
                <h4 className='text-left text-base font-semibold mb-1'>
                  Prompt reminder title
                </h4>
                <p className='text-left text-sm'>Write down your password</p>
              </div>
            </div>
            <div className='mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3'>
              <Input
                inputValue={this.state.pwd}
                inputType='password'
                name='NEW PASSWORD'
                size=' w-full mb-2'
                required={true}
                onChange={this.onPwdChange}
              />
              <Input
                inputValue={this.state.repwd}
                inputType='password'
                name='CONFIRM PASSWORD'
                size=' w-full mb-2'
                required={true}
                onChange={this.onRePwdChange}
              />
            </div>
            <div className={alertClass}>{pwd_alert}</div>
            <div className='flex justify-start'>
              <button
                className='rounded-xl py-3 px-8 text-base font-bold bg-primary text-white'
                onClick={() => {
                  this.onSave();
                }}
              >
                Save Password
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (password, password_confirmation) => {
    dispatch(userActions.updatePwd({ password, password_confirmation }));
  },

  alertClear: () => {
    dispatch(userActions.clearPwdUpdateAlert());
  },
});

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  const { subscriptions, dogs, pwd_alert, pwd_update_success } = state.user;
  return {
    user,
    dogs,
    subscriptions,
    pwd_alert,
    pwd_update_success,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PwdModal);

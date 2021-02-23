import React from "react";

class Button extends React.Component {
    constructor(props) {
      super(props)
    }
  
    render() {
      const { text, styles="", filled=false, handleClick=()=>{}, onClick } = this.props

      return (
        <>
          {!filled ?
            <button onClick={(e) => onClick ? onClick(e) : handleClick(e)} className={`border rounded-xl py-2 px-6 text-base font-bold ${styles}`} style={{"borderColor":"green", "color":"green"}}>
              {text}
            </button>
          :
            <button onClick={(e) => onClick ? onClick(e) : handleClick(e)} className={`border rounded-xl py-2 px-6 text-base font-bold filled-global-button ${styles}`}>
              {text}
            </button>
          }
        </>
      )
    }
}

export default Button;

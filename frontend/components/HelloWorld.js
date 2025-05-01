import React from "react"
import PropTypes from "prop-types"
import dateFormat from "shared/date-format";

const HelloWorld = (props) => {
  return (
    <React.Fragment>
      Greeting: {props.greeting}
      <br />
      Date: {dateFormat(new Date(), "d MMM")}
    </React.Fragment>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default HelloWorld

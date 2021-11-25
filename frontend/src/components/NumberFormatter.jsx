import React from "react";

const NumberFormatter = (props) => {
  const { val, decimalPlace } = props;

  const denomination = (value) => {
    if (value > 1000000000) {
      return (value / 1000000000).toString() + "B";
    } else if (value > 1000000) {
      return (value / 1000000).toString() + "M";
    } else if (value > 1000) {
      return (value / 1000).toString() + "K";
    } else {
      return value.toString();
    }
  };
  return parseFloat(val).toFixed(decimalPlace);
};

export default NumberFormatter;

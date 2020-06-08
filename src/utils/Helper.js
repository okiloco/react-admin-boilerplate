var currency = require("currency-formatter");
const prettyBytes = require('pretty-bytes');
export const money = (value, decimalSeparator) => {
  return currency.format(value, {
    code: "USD",
    decimalDigits: 0,
    precision: 0,
    decimalSeparator: "."
    //typeof decimalSeparator !== "undefined" ? decimalSeparator : ","
  });
};

export const Bytes = value => prettyBytes(value);

import { ExportToCsv } from "export-to-csv";
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
export const decimal = (value, decimal = ",") => {
  return currency.format(value, {
    symbol: "",
    decimal,
    precision: 0,
    format: "%v %s" // %s is the symbol and %v is the value
  });
};

export const exportToCsv = (data, options) => {
  const headers = options.headers;
  options = {
    fieldSeparator: options.fieldSeparator || ";",
    quoteStrings: '"',
    decimalSeparator: options.decimalSeparator || ".",
    showLabels: true,
    showTitle: true,
    title: options.title || "Report",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: headers ? false : true,
    headers
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  const csvExporter = new ExportToCsv(options);
  if (data.length == 0) return;
  csvExporter.generateCsv(data);
};
export const Bytes = value => prettyBytes(value);

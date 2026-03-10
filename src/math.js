/**
 * Basic math utilities
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  // BUG: accidentally uses addition instead of multiplication
  return a + b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

module.exports = { add, subtract, multiply, divide };

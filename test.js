#!/usr/bin/env node
// Simple test runner — exits 0 on pass, non-zero on failure

const assert = require("assert");
const { add, subtract, multiply, divide } = require("./src/math");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    failed++;
  }
}

console.log("\nRunning math tests...\n");

test("add(2, 3) === 5", () => assert.strictEqual(add(2, 3), 5));
test("add(-1, 1) === 0", () => assert.strictEqual(add(-1, 1), 0));
test("add(0, 0) === 0", () => assert.strictEqual(add(0, 0), 0));

test("subtract(10, 4) === 6", () => assert.strictEqual(subtract(10, 4), 6));
test("subtract(0, 5) === -5", () => assert.strictEqual(subtract(0, 5), -5));

test("multiply(3, 4) === 12", () => assert.strictEqual(multiply(3, 4), 12));
test("multiply(2, 5) === 10", () => assert.strictEqual(multiply(2, 5), 10));
test("multiply(-2, 3) === -6", () => assert.strictEqual(multiply(-2, 3), -6));

test("divide(10, 2) === 5", () => assert.strictEqual(divide(10, 2), 5));
test("divide(9, 3) === 3", () => assert.strictEqual(divide(9, 3), 3));
test("divide by zero throws", () => assert.throws(() => divide(1, 0)));

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}

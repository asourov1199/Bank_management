import test from "node:test";
import assert from "node:assert/strict";
import {
  applyTransaction,
  createInitialState,
  parseAmount,
  restoreState,
  MAX_BALANCE,
} from "../src/utils/banking.js";
const date = "2026-10-31T08:00:00.000Z";
test("valid money is converted to exact integer poisha", () => {
  assert.equal(parseAmount("100"), 10000);
  assert.equal(parseAmount("0.01"), 1);
  assert.equal(parseAmount(" 12.30 "), 1230);
});
test("empty, zero, negative, malformed and oversized amounts are rejected", () => {
  for (const amount of [
    "",
    " ",
    "0",
    "0.00",
    "-1",
    "1.001",
    "NaN",
    "Infinity",
    "1e3",
    "1,000",
    "999999999999999999",
  ]) {
    assert.throws(() => parseAmount(amount), Error, amount);
  }
});
test("deposit and withdrawal update balance and keep newest history first", () => {
  const initial = createInitialState();
  const deposited = applyTransaction(initial, "deposit", 1230, "one", date);
  const withdrawn = applyTransaction(deposited, "withdrawal", 230, "two", date);
  assert.equal(withdrawn.balance, initial.balance + 1000);
  assert.deepEqual(
    withdrawn.transactions.map((tx) => tx.id),
    ["two", "one"],
  );
  assert.equal(initial.transactions.length, 0);
});
test("exact balance can be withdrawn, overdrafts and invalid transactions cannot", () => {
  const initial = createInitialState();
  assert.equal(
    applyTransaction(initial, "withdrawal", initial.balance, "one", date)
      .balance,
    0,
  );
  assert.throws(
    () =>
      applyTransaction(initial, "withdrawal", initial.balance + 1, "one", date),
    /Insufficient/,
  );
  for (const amount of [0, -1, 1.1, NaN, Infinity])
    assert.throws(() =>
      applyTransaction(initial, "deposit", amount, "one", date),
    );
  assert.throws(() => applyTransaction(initial, "transfer", 100, "one", date));
  assert.throws(
    () => applyTransaction(initial, "deposit", MAX_BALANCE, "one", date),
    /limit/,
  );
});
test("refresh restores the ledger and recalculates its balance", () => {
  const state = applyTransaction(
    createInitialState(),
    "deposit",
    10000,
    "one",
    date,
  );
  assert.deepEqual(restoreState(JSON.stringify(state)), state);
  assert.deepEqual(
    restoreState(JSON.stringify({ ...state, balance: 0 })),
    state,
  );
});
test("corrupt browser data safely falls back to the demo account", () => {
  for (const raw of [
    null,
    "bad json",
    "{}",
    JSON.stringify({
      transactions: [{ id: "x", type: "deposit", amount: -1, date }],
    }),
    JSON.stringify({
      transactions: [{ id: "x", type: "deposit", amount: 100, date: "bad" }],
    }),
  ]) {
    assert.deepEqual(restoreState(raw), createInitialState());
  }
});

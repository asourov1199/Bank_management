import { test, expect } from "@playwright/test";

test("deposit, cancel, confirm, totals and persistence", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Account overview." }),
  ).toBeVisible();
  await expect(page.getByText("A fresh start")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Deposit", exact: false })
    .click();
  await page.getByLabel("Amount in BDT").fill("100.50");
  await page.getByRole("button", { name: "Deposit money" }).click();
  await expect(page.getByRole("status")).toContainText(
    "deposited successfully",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Withdraw", exact: false })
    .click();
  await page.getByLabel("Amount in BDT").fill("50.25");
  await page.getByRole("button", { name: "Review withdrawal" }).click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Confirm withdrawal" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Review withdrawal" }).click();
  await page
    .getByRole("button", { name: "Confirm withdrawal", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "withdrawn successfully",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Transaction History", exact: false })
    .click();
  await expect(page.locator(".transaction-row")).toHaveCount(2);
  await expect(page.locator(".transaction-row").first()).toContainText(
    "Withdrawal",
  );
  await page.reload();
  await expect(page.locator(".transaction-row")).toHaveCount(2);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Overview", exact: false })
    .click();
  const cards = page.locator(".balance-card");
  await expect(cards.nth(0)).toContainText("25,050.25");
  await expect(cards.nth(1)).toContainText("100.50");
  await expect(cards.nth(2)).toContainText("50.25");
  expect(errors).toEqual([]);
});

test("invalid inputs and overdrafts show errors without creating history", async ({
  page,
}) => {
  await page.goto("/#/deposit");
  for (const amount of ["", "0", "-50", "abc", "1.234", "99999999999999999"]) {
    await page.getByLabel("Amount in BDT").fill(amount);
    await page.getByRole("button", { name: "Deposit money" }).click();
    await expect(page.getByRole("alert")).not.toBeEmpty();
  }
  await page.goto("/#/withdraw");
  await page.getByLabel("Amount in BDT").fill("25000.01");
  await page.getByRole("button", { name: "Review withdrawal" }).click();
  await expect(page.getByRole("alert")).toContainText("Insufficient balance");
  await page.goto("/#/transactions");
  await expect(page.getByText("A fresh start")).toBeVisible();
});

test("entire balance can be withdrawn and a new deposit restores funds", async ({
  page,
}) => {
  await page.goto("/#/withdraw");
  await page.getByLabel("Amount in BDT").fill("25000");
  await page.getByRole("button", { name: "Review withdrawal" }).click();
  await page
    .getByRole("button", { name: "Confirm withdrawal", exact: true })
    .click();
  await expect(page.locator(".money-note h2")).toContainText("0.00");
  await page.goto("/#/deposit");
  await page.getByLabel("Amount in BDT").fill("0.01");
  await page.getByRole("button", { name: "Deposit money" }).click();
  await expect(page.locator(".money-note h2")).toContainText("0.01");
});

test("corrupt storage recovers and blocked storage displays warning", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("greenline-bank-v1", "not json"),
  );
  await page.goto("/");
  await expect(page.locator(".balance-card").first()).toContainText(
    "25,000.00",
  );
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("storage is unavailable");
});

test("mobile navigation and layouts fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/#/deposit", "/#/withdraw", "/#/transactions"]) {
    await page.goto(route);
    await expect(page.getByRole("navigation")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

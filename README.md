## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Running the Tests](#running-the-tests)
5. [Adding New Steps and Features](#adding-new-steps-and-features)
6. [Instructions](#instructions)

---

## Prerequisites

- **Node.js** (v14 or later recommended)
- **Nx CLI** (optional, but helpful). You can install it globally:

  `npm install -g nx`

  Or just use `npx nx <command>` within the project.

  Learn more about nx: [https://nx.dev/](https://nx.dev/)

---

## Installation

1. **Clone** this repository (or download the source).
2. **Install dependencies**:

   `npm install`

   or

   `yarn`

   **Install playwright**:

   `npx playwright install`

---

## Running the App

1. **Serve** the app locally:

   `nx serve my-calculator-workspace`

   Nx will compile and run the React app on **<http://localhost:4200>** by default.

2. **Open** your browser at <http://localhost:4200>.

---

## Running the Tests

We use **Cucumber** + **Playwright** for E2E tests. The tests are located in the **e2e** project, typically named `my-calculator-workspace-e2e`.

### Run With Nx

1. In one terminal:

   `nx serve my-calculator-workspace`

2. In another terminal:

   `npm run cucumber`

   If you have issues, try also this command

   `nx e2e my-calculator-workspace-e2e`

---

## Adding New Steps and Features

You can add or modify test scenarios in the **Cucumber feature files** and **step definitions** under:

```
apps/
  my-calculator-workspace-e2e/
    src/
      features/  <-- .feature files here
      steps/     <-- .steps.ts files here
```

- **Feature Files**: Write your Gherkin (`.feature`) scenarios in `features/`.
- **Step Definitions**: Implement the test logic in `.steps.ts` files under `steps/`.
- **Aditional Objects**: Feel free to structure any Page Object Model (POM) elements however you prefer.

When you run `npm run cucumber` or `nx e2e my-calculator-workspace-e2e`, Nx will execute all scenarios in `features/` and use the step definitions in `steps/`.

---

## Instructions

1. Add some end-to-end tests in a way you believe is most efficient.

2. You can use the blank feature and step files as a starting point, but feel free to create your own approach if you prefer.

3. Creating a Page Object Model (POM) to assist your tests is encouraged.

4. Avoid modifying the application’s source files directly, if possible.

---

**Happy Testing!**
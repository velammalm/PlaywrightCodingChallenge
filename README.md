# PlaywrightCodingChallenge
Creation of generic automation code to test the website **'Ab in den Urlaub'** for different markets (de, at, ch) to ensure proper functional behavior.

## Table of Contents

- [Description](#description)
- [KeyFeatures](#keyfeatures)
- [Completed Tasks](#CompletedTasks)
- [Windows Specific Installation and guidelines](#WindowsSpecificInstallationandguidelines)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Mac Specific Installation and guidelines](#MacSpecificInstallationandguidelines)
- [TestCases](#TestCases)
- [TestExecution](#TestExecution)
- [Reports](#Reports)

## Description
The **PlaywrightCodingChallenge** project aims to create a flexible and reusable automation framework using Playwright for testing the **'Ab in den Urlaub'** website across various markets, including Germany (de), Austria (at), and Switzerland (ch). This ensures that the website behaves correctly and consistently in different locales.

## KeyFeatures

- **Unique Page Object Model Design Pattern**: This framework design stands apart from traditional POMs because it has a centralized method for setting up the page. It includes a hook that runs before each test, setting the page context. By centralizing these setup operations, it ensures a consistent starting point for each test, improving test reliability. This unique approach significantly reduces complexity and accelerates coding, making it easier and faster to write scripts compared to traditional POMs. This means less time spent on setup and more time spent on creating effective tests.

- **Utility Functions**: Simplifies common actions and assertions, such as clicking buttons, filling forms, and checking elements. It also includes built-in methods for conditional statements and maintains a default load state across applications.

- **Detailed Reporting**: Provides screenshots, videos, and traces of test failures, making it easier to understand and fix issues. The framework also supports customizable Allure reports for enhanced reporting capabilities.

## CompletedTasks

The following tasks have been completed in this repository:


**1. Basic functionalities check**\
**2. Login functionality**\
**3. Destination and date selection**\
**4. Offer selection**\
**5. Offer page**

- Validation of HomePage
- Validation of Login functionality - to test the behavior when the user inputs incorrect credentials
- Selection of offer based on the user input(destination, travel date) and validation of offer page

## WindowsSpecificInstallationandguidelines
## Prerequisites
Ensure you have the following software installed on your machine:

**npm (v8.0.0 or later)**: Package manager for JavaScript/Typescript, used to install and manage software packages.
To verify your current version, use the command

```bash
npm -v
```

If npm isn't installed, follow the [npm installation guide.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

**Node.js (v16.0.0 or later)**: JavaScript runtime built which allows the execution of JavaScript server-side.
To verify your current version, use the command

```bash
node -v.
```

## Installation

1. Clone the Repository

  You can clone the repository using Git:

```bash
git clone https://github.com/velammalm/PlaywrightCodingChallenge
```

  Alternatively, you can download the repository as a ZIP file directly from GitHub.


2. Navigate to the project directory:

```bash
cd PlaywrightCodingChallengeFolderPath
```

3. Install the dependencies:

```bash
npm install
```

4. Install the Playwright browsers

```bash
npx playwright install
```


## MacSpecificInstallationandguidelines

Please install packages using homebrew.\
For installing homebrew, please follow these instructions:
https://brew.sh

Once brew is installed in your Mac, please install the following:
```bash
brew install npm
brew install node
```

Please check for version compatibility using the following commands (npm (v8.0.0 or later), Node.js (v16.0.0 or later))
```bash
npm -v
node -v
```

Then install playwright browsers and run in webkit and see the report
```bash
npx playwright install
npx playwright test --headed --project=webkit
npx playwright show-report my-report
```

For Allure reports
```bash
 npm install allure-playwright
 npm install allure-commandline
 allure generate ./allure-results --clean; allure open ./allure-report
```

## TestCases

You can find the testcases under **specs** folder

<img width="211" alt="Screenshot 2024-11-01 at 11 06 14" src="https://github.com/user-attachments/assets/9db9ba6b-e8fd-4d0a-9a3f-b1d8be2c2814">


## TestExecution

**You can change the url in playwright.config.ts**
Update the value of **baseURL** in **playwright.config.ts** to run the tests in different markets
eg:  **baseURL: 'your-preferred-url'**

<img width="946" alt="Screenshot 2024-11-01 at 10 59 15" src="https://github.com/user-attachments/assets/d4206081-8339-4f90-a1df-3b98eaba0e5f">


To execute the test in playwright browser:

### Execution in chromium - headed mode
```bash
npx playwright test --headed --project=chromium
```
### Execution in firefox - headed mode
```bash
npx playwright test --headed --project=firefox
```
### Execution in safari - headed mode
```bash
npx playwright test --headed --project=webkit
```
### For execution in SEQUENCE in a particular browser(eg: chrome) ###
```bash
npx playwright test --headed --project=chromium --workers=1
```

### Execution Parallely in all browser 
```bash
npx playwright test
```
### To execute particular test 
```bash
npx playwright test --grep 'Validation of offers' 
```
## Reports

After test execution to view the reports:

```bash
npx playwright show-report my-report
```

For Allure reports, install the following

```bash
 npm install allure-playwright
 npm install allure-commandline
```

To View the allure report, 
```bash
 allure generate ./allure-results --clean; allure open ./allure-report
```

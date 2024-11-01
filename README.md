# PlaywrightCodingChallenge
Creation of generic automation code to test the website **'Ab in den Urlaub'** for different markets (de, at, ch) to ensure proper functional behavior.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description
The **PlaywrightCodingChallenge** project aims to create a flexible and reusable automation framework using Playwright for testing the **'Ab in den Urlaub'** website across various markets, including Germany (de), Austria (at), and Switzerland (ch). This ensures that the website behaves correctly and consistently in different locales.

## Features

- Validation of HomePage
- Validation of Login functionality - to test the behavior when the user inputs incorrect credentials
- Selection of offer based on the user input(destination, travel date) and validation of offer page

## Prerequisites
Ensure you have the following software installed on your machine:

npm (v8.0.0 or later): Package manager for JavaScript, used to install and manage software packages.
To verify your current version, use the command npm -v.
If npm isn't installed, follow the npm installation guide.
Node.js (v16.0.0 or later): JavaScript runtime built on Chrome's V8 JavaScript engine, allowing the execution of JavaScript server-side.
To verify your current version, use the command node -v.

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




# UPS OAuth 2.0 Account Validation Example

This example demonstrates how to use Shippo's APIs to validate a connected UPS carrier account using OAuth 2.0.

## Features

- OAuth Authentication with UPS
- Containerized with Docker
- Secure State Parameter Validation
- Responsive Design using Tailwind CSS

## Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- Docker

## Getting Started

### Clone the Repository

```bash
mkdir sol-ups-oauth
cd sol-ups-oauth
git clone https://github.com/JonathanMucha/sol-ups-oauth.git
cd sol-ups-oauth
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
API_KEY=<YOUR_SHIPPO_API_KEY>
DATA_FILE=carrier_accounts.json # Data file provided by Shippo
NEXT_PUBLIC_BASE_URL=<YOUR_HOSTING_URL>:3000
NEXT_PUBLIC_REDIRECT_URL=<YOUR_HOSTING_URL>/thankyou
```

### Request Data

You will need a json file containing the relavant UPS account information. It should look like this:

```json
[
  {
    "shippo_object_id": "43dfec5c8wsdf42fd9b4596289688a10a",
    "usernames": ["<UPS Username 1>", "<UPS Username 2>", ...],
    "account_number": "111111"
  },
  ...,
]
```
Once you have obtained this file, place it in the `data` directory of the project.


## Hosting the Application

Compile the docker image:

```bash
docker build -t sol-ups-oauth .
```
Host your application wherever you normally host your docker containers.


## Usage

Navigate to the hosted application in your browser. Select the UPS account you would like to authenticate via oAuth. That page will provide a button to generate the oAuth link. Clicking the button will redirect you to the UPS login page. After logging in, you will be redirected back to the application's Thank You page where the state parameter will be validated.


## Considerations

- The home page for the application displays the `object_id`, `account number`, and associated `usernames` for each UPS account. This information is  sensitive, and should not be shared with anyone who does not have a need to know. We recommend that you host this application in a way that restricts access to the home page to only those who need to use it.

## Contact

If you have any questions or need further assistance, please reach out to your Shippo Account Manager or the Solutions Engineering team at `soltions@shippo.com`
<div>
  <img width="1680" alt="Tenderly Snap" src="https://github.com/Tenderly/tenderly-metamask-snap-simulate-asset-changes/assets/26412515/7b2f0a8d-8b3e-43bd-be50-1e7ddb4a0a0f">
  <h1 align="center">Tenderly Snap</h1>
</div>

<p align="center">
  Tenderly Snap presents opportunities for wallets, DeFi projects, and DEXs to make transactions more human-readable for their users.
</p>

<p align="center">
  <a href="https://twitter.com/TenderlyApp">
    <img src="https://img.shields.io/twitter/follow/TenderlyApp?style=flat&label=%40TenderlyApp&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/Tenderly/tenderly-snap/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Tenderly/tenderly-snap?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

# Introduction

The Tenderly Snap is an innovative collaboration that merges the robust simulation capabilities of Tenderly with the extensive features of MetaMask Snaps. Our main objective is to augment the transparency and visibility of dApp contract calls, giving users a comprehensive overview before they confirm a transaction.

Upon setting up a transaction, the user is presented with the following data points to assist in making an informed decision:

| Feature | Description |
|---------|-------------|
| **Link to Simulation in Tenderly Dashboard** | For a more in-depth analysis, users can follow a link to view the full contract simulation on the Tenderly Dashboard. |
| **Link to Publicly Shared Simulation in Tenderly Dashboard** | The shared resources are in read-only mode. The receiver of the URL does not need to have a Tenderly account to view the resources. |
| **Asset Changes with Dollar Value** | To assist in understanding the financial implications of the transaction, users are shown any changes in asset quantities along with their corresponding dollar value. The most commonly used token standards are supported: **ERC20** and **ERC721**. |

By providing these features, our project aims to enhance the user experience, reduce transaction risks, and increase the understanding of blockchain transactions.

# Setup

Welcome to the setup guide for the Tenderly Snap. In this tutorial, we will guide you through each step to ensure that you are set up correctly. Follow the instructions below to get started.

## 1. MetaMask Snap Development

### Disable the Production Version of MetaMask

If you have the production version of MetaMask installed, you'll need to disable it. Navigate to `chrome://extensions` in your browser. Locate MetaMask from the list of your installed extensions, and toggle it off. Alternatively, you can start a new profile in Chrome or Brave, which will allow you to use different extensions for different purposes.

### Install MetaMask Flask Development Plugin

The next step is to install the MetaMask Flask development plugin. This is a specific version of MetaMask designed for development purposes. You can install it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk). Simply click the link and follow the instructions to add the plugin to your browser.

## 2. Tenderly Access

### Open a Tenderly Account

To use the Tenderly MetaMask snap, you'll need a Tenderly account. If you don't have one already, visit the [Tenderly website](https://dashboard.tenderly.co/register) and create a new account.

### Create an Access Token

Once you've logged into your Tenderly account, you will need to create an `access token`. This is a unique identifier that allows the Tenderly MetaMask snap to interact with your Tenderly account. You can generate it on the following link https://dashboard.tenderly.co/account/authorization.

<img width="577" alt="image" src="https://github.com/Tenderly/tenderly-metamask-snap-simulate-asset-changes/assets/26412515/0abb39b3-dd2b-4af6-98c4-73c00f4f70f0">

## 3. App Setup

### Clone the Repository

Now, you'll need to get the code for the app onto your local machine. You can do this by cloning this repository. If you're not sure how to do this, you can find detailed instructions in the GitHub documentation.

### Start the App

After you've cloned the repository, navigate to the root directory of the project in your terminal. Once you're in the correct location, run the command `yarn start`. This will start the app, and it should be accessible on http://localhost:8000.

To clone the repository, use the following command:

```
git clone https://github.com/Tenderly/tenderly-snap.git
```

Then navigate to the root directory of the project:

```
cd tenderly-snap
```

Start the app with:

```
yarn start
```

## 4. Connection & Credentials

### Install the Snap

With the app running, you can now install the Tenderly MetaMask snap. To do this, click on **Reconnect** button within the app.

### Add Tenderly Credentials

Finally, you'll need to add your Tenderly credentials to the snap. Click on **Add access token** button within the app. You'll need to enter your credentials in the following format: `{account_id}@{project_id}@{access_token}`.

That's it! You've successfully set up the Tenderly MetaMask snap. If you encounter any issues during the setup process, don't hesitate to reach out to our support team at support@tenderly.co. We're here to help! 💜

# Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/Tenderly/tenderly-snap/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/Tenderly/tenderly-snap/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/Tenderly/tenderly-snap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Tenderly/tenderly-snap" alt="tenderly-contributors" />
</a>

# Author

- Vanja Paunović ([@dzimiks](https://twitter.com/dzimiks))

<br/>

The repo is made using [@metamask/template-snap-monorepo](https://github.com/MetaMask/template-snap-monorepo).

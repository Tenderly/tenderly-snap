<div>
  <img width="1680" alt="Tenderly Snap" src="https://github.com/Tenderly/tenderly-snap/assets/26412515/88faa440-d7b5-41e2-98de-a7fcdc4d029f">
  <h1 align="center">Tenderly Snap</h1>
</div>

<p align="center">
  Tenderly TX Preview allows you to see the exact transaction outcomes before sending them on-chain using the Tenderly Simulation Infrastructure.
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
  <a href="#setup"><strong>Setup</strong></a>
</p>
<br/>

# Introduction

Tenderly [TX Preview](https://docs.tenderly.co/simulations-and-forks/transaction-preview) enables you to see the exact outcomes of your transactions before sending them on-chain. Powered by the Tenderly Simulation Infrastructure, this feature gives you detailed and human-readable information about your transactions, including transferred assets with exact dollar values for ERC-20 tokens and NFTs.

By previewing transactions before sending, you can avoid unnecessary gas costs, prevent failed transactions, and identify potential security risks. With Tenderly TX Preview, you can make an informed decision thanks to the following information:

| Feature                                                      | Description                                                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Asset Changes with Dollar Values**                         | See the exact asset transfers within your ERC-20 and ERC-721 transactions, including their corresponding dollar values.                                                   |
| **Link to Simulation in Tenderly Dashboard**                 | Get detailed information about your transaction simulations in the Tenderly Dashboard.                                                                                    |
| **Link to Publicly Shared Simulation in Tenderly Dashboard** | Share your simulated transactions with others using a public URL. The recipient doesn’t need to have a Tenderly account to view the shared transaction in read-only mode. |

With this in-depth information about your transactions, you can understand their exact financial implications, avoid any hidden security risks, and save valuable resources.

<div align="center">
    <a href="https://youtu.be/E8TGyDlV8wQ">
        <img src="https://img.youtube.com/vi/E8TGyDlV8wQ/maxresdefault.jpg" alt="Tenderly" width="100%" height="auto" style="background-color: #ffffffb2; padding: 10px 20px; margin-bottom: 20px; box-sizing: border-box; max-width:200px;" />
    </a>
</div>

# Setup

To start using Tenderly TX Preview, you can set it up using the Tenderly Dashboard or run it locally. Follow a few simple steps to get started.

## 1. Get Tenderly access

First, you need a Tenderly account to start using the TX Preview feature. To set up your account, [register by following a few simple steps](https://dashboard.tenderly.co/register).

### Install Tenderly Snap from the Dashboard

Next, generate a Tenderly access token to allow Tenderly Snap to connect to your Tenderly account. This is a unique identifier that you can on the following link https://dashboard.tenderly.co/account/authorization.

By clicking the **Connect to Tenderly Snap** button, you’ll automatically install Tenderly Snap and be able to use Tenderly TX Preview.

<img width="603" alt="image" src="https://github.com/Tenderly/tenderly-snap/assets/26412515/7273a10a-63ea-4523-a97a-1906f758e9f3">

## 2. Run Tenderly Snap locally

You can also set up Tenderly Snap locally. To achieve this, follow the steps below.

### Clone the Repository

First, download the app code onto your local machine by cloning this repository. For more information, find detailed instructions in the GitHub documentation.

Note that you need a Tenderly account to use Tenderly Snap, so make sure to create it as described above.

### Start the app

After cloning the repository, go to the root project directory in your terminal. Next, run the `yarn start` command to start the app. Once done, you can access it on http://localhost:8000.

Use the following command to clone the repository:

```
git clone https://github.com/Tenderly/tenderly-snap.git
```

Next, go to the root project directory:

```
cd tenderly-snap
```

Finally, start the app using:

```
yarn install && yarn start
```

Congrats, you’ve successfully installed Tenderly Snap on your local machine. You can now use Tenderly TX Preview. If you come across any issues, feel free to reach out to our support team at support@tenderly.co. We're happy to help! 💜

# Author

- Vanja Paunović ([@dzimiks](https://twitter.com/dzimiks))

<br/>

The repo was made using the [@metamask/template-snap-monorepo](https://github.com/MetaMask/template-snap-monorepo) and
inspired by the [open-source repo](https://github.com/halo3mic/tenderly-snap) by [Miha Lotric](https://twitter.com/mihalotric).

---
sidebar_position: 1
---

# Introduction

## **Obsrvr Gateway Overview**

Obsrvr Gateway provides a seamless and secure connection to both the **Stellar** and **Stellar RPC** networks. It allows developers and businesses to interact with both **Mainnet** and **Testnet** environments using dedicated APIs. Whether you are building decentralized applications (dApps) or exploring transaction data, the Obsrvr Gateway ensures easy access to the tools you need.

### **Supported Networks:**

- **Stellar Mainnet:** `https://stellar.nodeswithobsrvr.co/`
- **Stellar Testnet:** `https://stellar-testnet.nodeswithobsrvr.co/`
- **Stellar RPC Mainnet:** `https://rpc.nodeswithobsrvr.co/`
- **Stellar RPC Testnet:** `https://rpc-testnet.nodeswithobsrvr.co/`

These endpoints allow access to their respective networks for interacting with accounts, assets, transactions, and other key data on the Stellar and Soroban networks.

---

## **API Key Authentication**

To access any of the provided APIs, you must authenticate using an API key. These keys can be generated from the **Obsrvr Console**.

### **How to Generate an API Key:**

1. Visit the Obsrvr Console: [console.withobsrvr.com](https://console.withobsrvr.com).
2. Create a subscription to access Obsrvr services.
3. After creating your subscription, navigate to the "Teams" section.
4. Generate a **Team API Key**. 
5. Your API key will be displayed at the top of the screen in a message bar. Make sure to copy it for future use.
6. You can revoke the API key at any time by selecting the **Revoke** button next to the key in the Console.

### **Using the API Key in Requests:**

When making requests to the Obsrvr Gateway, include the API key in the HTTP headers for authentication. The format for the header is as follows:

```bash
Authorization: Api-Key YOUR_API_KEY
```

**Example Request:**

```bash
curl -H "Authorization: Api-Key 1bBhBBbB.AAaa6MlgbAa5CCCIQaaaaCRClP4567yy" -L https://stellar-testnet.nodeswithobsrvr.co/
```

This header ensures that your requests are authorized to access the network resources.

---

## **Endpoints**

### **Stellar Mainnet:**

- **Base URL:** `https://stellar.nodeswithobsrvr.co/`
- **Usage:** Access Stellar’s main network for real-time transactions, accounts, and asset data.

### **Stellar Testnet:**

- **Base URL:** `https://stellar-testnet.nodeswithobsrvr.co/`
- **Usage:** Interact with Stellar’s test network to develop and test applications.

### **Stellar RPC Mainnet:**

- **Base URL:** `https://rpc.nodeswithobsrvr.co/`
- **Usage:** Execute Soroban smart contracts, and query real-time blockchain data on the main network.

### **Stellar RPC Testnet:**

- **Base URL:** `https://rpc-testnet.nodeswithobsrvr.co/`
- **Usage:** Develop, test, and simulate Soroban smart contracts in a test environment.

---

## **Managing API Keys**

API keys are critical for accessing and managing Obsrvr Gateway resources. You can create, view, and revoke keys directly through the Obsrvr Console. 

- **Creating API Keys:**
  - Go to the Obsrvr Console and navigate to the "Teams" section.
  - Click on "New Team API Key" to generate a key.
- **Revoking API Keys:**
  - To revoke an API key, select the **Revoke** button next to the specific key in the Console. Once revoked, the key will no longer be valid for authorization.

---

## **Best Practices**

- **Keep your API key private**: Ensure that your API keys are not shared publicly or in your source code. 
- **Use a separate key for each environment**: You can generate separate API keys for different teams or environments (production, testing) to maintain better security and manageability.
- **Rotate your keys regularly**: Regularly rotating API keys ensures enhanced security and minimizes risk in case of accidental exposure.

---

### **Next Steps:**

For more information on how to use the API or integrate with Stellar/Soroban, explore our comprehensive [API documentation](https://docs.withobsrvr.com) or visit the Obsrvr Console at [console.withobsrvr.com](https://console.withobsrvr.com).

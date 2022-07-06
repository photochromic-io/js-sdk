# JavaScript/TypeScript Library

The library is divided in 3 main parts:

1. `Contracts` include all read methods on the contracts.
2. `Identity` abstracts away all read methods (1) by wrapping them for a specific node.
3. `IdentitySigner` interacts with the contracts through a specific signer.

## Prerequisites

- `ethers.js`
- Understand ENS specific [terminology](https://docs.ens.domains/terminology).

## Use Cases

### 1. Gathering General Information

If you need to gather records from various ENS names, then the `Contracts` class should suffice.

#### Setup

```typescript
const provider = new InfuraProvider("homestead", process.env.INFURA_API_KEY);
const contracts = await initContracts(provider);
```

#### Example(s)

```typescript
const ppy = await contracts.getPricePerYear();
```

### 2. Gathering Information for a Specific User

Abstracts away all the parameters such as `node` and `address`.

#### Setup

```typescript
const address = "0x";
const identity = await newIdentity(address, provider);
```

#### Example(s)

```typescript
const hasIdentity = await identity.hasIdentity();
```

### 2. Gathering Information for a Wallet (Signer)

#### Setup

```typescript
const signer = provider.getSigner();
const identity = await newIdentitySigner(signer);
```

#### Example(s)

```typescript
await identity.setText("com.telegram", "john_doe");
```

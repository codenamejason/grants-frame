import { Address, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { config } from "dotenv";
import { registryProxyAddress } from "./config.js";
import { abi as registryProxyAbi } from "../abis/Registry.js";

config();

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// JSON-RPC Account
export const [address] = await walletClient.getAddresses();

// Local Account
export const adminAccount = privateKeyToAccount(
  process.env.PRIVATE_KEY as `0x${string}`
);

export const getUserData = async (fid: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR_API_KEY as string,
    },
  };

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    options
  );

  return response.json();
};

export const getBalance = async (user: Address, token: Address) => {
  const balance = await publicClient.readContract({
    address: token,
    abi: [
      {
        type: "function",
        name: "balanceOf",
        inputs: [{ name: "account", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
      },
    ],
    functionName: "balanceOf",
    args: [user],
  });

  return BigInt(balance);
};

export const getPriceData = async (token: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY as string,
      },
    }
  );

  return response.json();
};

export const sendCreateProfileTransaction = async (
  user: Address,
  name: string
): Promise<`0x${string}`> => {
  // const createProfileArgs: CreateProfileArgs = {
  //   nonce: BigInt(Math.floor(Math.random() * 1000000)),
  //   name: name,
  //   metadata: {
  //     protocol: BigInt(1),
  //     pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
  //   },
  //   owner: user,
  //   members: [user],
  // };

  // note: this will send as raw transaction
  // const txData: TransactionData = registry.createProfile(createProfileArgs);

  // ...
  const { request } = await publicClient.simulateContract({
    abi: registryProxyAbi,
    address: registryProxyAddress,
    account: adminAccount,
    functionName: "createProfile",
    args: [
      BigInt(Math.floor(Math.random() * 1000000)),
      name,
      {
        protocol: BigInt(1),
        pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
      },
      user,
      [user],
    ],
  });

  return await walletClient.writeContract(request);
};

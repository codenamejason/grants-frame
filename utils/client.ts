import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { config } from "dotenv";

config();

export const walletClient = createWalletClient({
  chain: base,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// JSON-RPC Account
export const [address] = await walletClient.getAddresses();

// Local Account
export const adminAccount = privateKeyToAccount(
  process.env.PRIVATE_KEY as `0x${string}`
);

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

export const getShibPriceData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd",
    {
      headers: {
        "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY as string,
      },
    }
  );

  return response.json();
};

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

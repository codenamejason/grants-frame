import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import { Address } from "viem";
import { baseSepolia } from "viem/chains";
import { registryProxyAddress } from "../utils/config.js";
// import { abi as alloProxyAbi } from "../abis/Allo.js";
import { abi as registryProxyAbi } from "../abis/Registry.js";
import { getUserData } from "../utils/client.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: "edge",
// };

type State = {
  pharoBalance: bigint;
  liked: boolean;
};

export const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  hub: neynar({ apiKey: process.env.NEYNAR_API_KEY as string }),
});

app.frame("/", async (c) => {
  const { status } = c;

  return c.res({
    image: tempImage(
      "Welcome! Enter a name to get started creating a profile on Allo v2.",
      status
    ),
    intents: [
      <TextInput placeholder="Enter a name for your profile" />,
      <Button action="/register-profile">Enter Name</Button>,
      ,
      status === ("response" || "redirect") && (
        <Button.Reset>Reset</Button.Reset>
      ),
    ],
  });
});

app.frame("/register-profile", async (c) => {
  const { inputText, status, verified } = c;
  const nameValue = inputText ?? ("" as string);

  console.log("values shit", {inputText, verified });

  if (!verified) {
    return c.res({
      image: tempImage("refresh the page", status),
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }

  return c.res({
    action: "/submit-register-profile",
    image: tempImage(`Nice to meet you, ${nameValue}!`, status),
    intents: [<Button>Submit</Button>],
  });
});

app.transaction("/submit-register-profile", async (c) => {
  const { inputText, frameData } = c;
  const userData = await getUserData(frameData?.fid!);
  let userAddress: Address;
  userAddress = userData.users[0].verified_addresses
    .eth_addresses[0] as Address;

  const name = inputText;

  userAddress = userData.users[0].verified_addresses
    .eth_addresses[0] as Address;

  return c.contract({
    abi: registryProxyAbi,
    chainId: `eip155:${baseSepolia.id}`,
    to: registryProxyAddress,
    functionName: "createProfile",
    args: [
      BigInt(Math.floor(Math.random() * 1000000)),
      name ?? "Anonymous",
      {
        protocol: BigInt(1),
        pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
      },
      userAddress,
      [userAddress],
    ],
  });
});

app.frame("/finish", (c) => {
  return c.res({
    image: tempImage("Thank you for paricipating!", "response"),
    intents: [
      <Button.Link href="https://warpcast.com/jaxcoder.eth/0xf5b0b729">
        Share
      </Button.Link>,
    ],
  });
});

const tempImage = (
  content: string,
  _status: "response" | "redirect" | "initial"
): JSX.Element => (
  <div
    style={{
      alignItems: "center",
      background: "linear-gradient(to right, #432889, #17101F)",
      backgroundSize: "100% 100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      height: "100%",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
    }}
  >
    <div
      style={{
        color: "white",
        fontSize: 60,
        fontStyle: "normal",
        letterSpacing: "-0.025em",
        lineHeight: 1.4,
        marginTop: 30,
        padding: "0 120px",
        whiteSpace: "pre-wrap",
      }}
    >
      {content}
    </div>
  </div>
);

function renderImage(content: string, image: string | undefined) {
  return (
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(to right, gold, #17101F)",
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        position: "relative" /* Add relative positioning */,
      }}
    >
      <div
        style={{
          whiteSpace: "pre-wrap",
          display: "flex",
          position: "absolute" /* Absolutely position the image */,
          top: 0 /* Adjust as needed */,
          zIndex: 1 /* Lower z-index for image (behind text) */,
        }}
      >
        {image && (
          <img src={image} alt="Pharo Landing" height={620} width={1200} />
        )}
      </div>
      <div
        style={{
          color: "white",
          fontSize: 60,
          fontWeight: "bold",
          position: "absolute" /* Absolutely position the text */,
          top: "50%" /* Adjust as needed */,
          left: "50%" /* Adjust as needed */,
          zIndex: 10 /* Higher z-index for text (in front) */,
          backgroundColor: "rgba(0, 0, 0, 0.5)" /* Semi-transparent */,
          padding: "20px" /* Add some padding */,
          borderRadius: "10px" /* Optional: Add rounded corners */,
          maxWidth: "80%" /* Optional: Limit width */,
          height: "45%" /* Optional: Limit height */,
          transform: "translate(-50%, -50%)" /* Center the text */,
        }}
      >
        {content}
      </div>
    </div>
  );
}

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

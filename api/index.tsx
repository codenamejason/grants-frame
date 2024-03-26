import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import {
  getUserData,
} from "../utils/client.js";
import { Address } from "viem";
import { baseSepolia } from "viem/chains";
import { pharoCoverAddress, pharoTokenAddress } from "../utils/config.js";

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

let pharoBalance: bigint = 0n;

app.frame("/", async (c) => {
  const { status } = c;

  return c.res({
    image: renderImage(
      "Welcome! Enter a name to get started creating a profile on Allo v2.",
      `/anubis-shiba-sky-underworld.png`
    ),
    intents: [
      <Button action="/create-profile-name">Next</Button>,
      status === ("response" || "redirect") && (
        <Button.Reset>Reset</Button.Reset>
      ),
    ],
  });
});

app.frame("/create-profile-name", async (c) => {
  const { status } = c;

  return c.res({
    action: "/create-profile",
    image: renderImage(
      "Welcome! Enter a name to get started creating a profile on Allo v2.",
      `/anubis-shiba-sky-underworld.png`
    ),
    intents: [
      
      <TextInput placeholder="Enter a name for your profile" />,
      <Button action="/create-profile">Enter Name</Button>,
      status === ("response" || "redirect") && (
        <Button.Reset>Reset</Button.Reset>
      ),
    ],
  });
});


app.frame("/create-profile", async (c) => {
  const { frameData, verified, inputText } = c;
  const userData = await getUserData(frameData?.fid!);

  let userAddress: Address;

  if (!verified) {
    return c.res({
      image: renderImage(
        "Not Verified frame message.",
        `/anubis-putting-river-pyramids-bright-16-9.png`
      ),
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }

  if (userData.users[0]) {
    userAddress = userData.users[0].verified_addresses
      .eth_addresses[0] as Address;
    if (userAddress.length > 2) {
      return c.res({
        image: renderImage(`You are ready ${inputText}. Click Submit to continue.`,
          `/anubis-helping-shiba.png`
        ),
        intents: [
          <Button.Transaction target="/submit-create-profile">Submit</Button.Transaction>,
          <Button.Reset>Reset</Button.Reset>,
        ],
      });
    }
  }

  return c.res({
    image: renderImage(
      pharoBalance > 0
        ? "You have PHRO tokens. Click next to continue."
        : "PHRO balance is 0, something went wrong. Please try again.",
      `/anubis-helping-shiba.png`
    ),
    intents: [
      pharoBalance > 0n && <Button action="/participate">Next</Button>,
      pharoBalance === 0n && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame("/finish", (c) => {
  const { transactionId } = c;

  return c.res({
    image: renderImage(
      `Thank you for participating!\nYour tx hash: ${transactionId?.slice(
        0,
        4
      )}`,
      `/anubis-putting-river-pyramids-bright-16-9.jpg`
    ),
    intents: [
      <Button.Link href="https://warpcast.com/jaxcoder.eth/0xf5b0b729">
        Share
      </Button.Link>,
    ],
  });
});

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

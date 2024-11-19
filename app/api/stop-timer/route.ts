import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  console.log("Webhook received: Stop Timer");
  try {
    const token = await req.text();
    const decodedToken = jwt.decode(token, {
      complete: true,
    }) as jwt.JwtPayload;
    const { kid } = decodedToken.header;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    const event = jwt.verify(token, signingKey) as {
      type: string;
      data: {
        user: {
          id: string;
        };
      };
    };

    if (event.type == "user.authenticated") {
      // TODO: Call the stopTimer function (from "@/actions") to stop the timer
      // get the user ID from the event data

      revalidatePath("/");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}

import { generateRandomString, alphabet } from "oslo/crypto";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const redirect_uri = `${process.env.URL}/api/callback`;
  const state = generateRandomString(16, alphabet("a-z", "0-9"));
  const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';

  redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`);
}
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { type Token } from '~/utils/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const apiKey = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');
  const myHeaders = new Headers();
  const urlencoded = new URLSearchParams();

  myHeaders.append("Authorization", `Basic ${apiKey}`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("redirect_uri", `${process.env.URL}/api/callback`);
  urlencoded.append("code", `${code}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  const res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
  const data = await res.json() as Token;
    
  cookies().set("access_token", data.access_token);
  cookies().set("refresh_token", data.refresh_token);

  redirect(`${process.env.URL}/`);
}
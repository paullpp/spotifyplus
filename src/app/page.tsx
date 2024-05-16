import { type PlaylistRes, type Playlist } from "~/utils/types";
import { cookies } from 'next/headers';

export default async function App() {
  let url = "https://api.spotify.com/v1/me/playlists?offset=0&limit=20";
  const playlists: Playlist[] = [];
  let hasNextPage = true;
  const cookieStore = cookies();
  const code = cookieStore.get('access_token');

  if (code) {
    while (hasNextPage === true) {
      if (!code) {
        console.log(code);
        throw new Error("invalid code");
      }
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${code.value}`,
          }
        });
        const data = await res.json() as PlaylistRes;
        if (data.next !== null) {
          url = data.next!;
        } else {
          hasNextPage = false;
        }
        data.items.map((playlist: Playlist) => {
          playlists.push(playlist);
        });
      } catch(error) {
        console.log(error);
        throw new Error("error when fetching playlists");
      }
    }
  }


  return (
    <div className="m-5">
      <h1 className="flex font-bold text-4xl justify-center mb-5">
        Playlists
      </h1>
      {code ? (<></>) : (
        <a href={`${process.env.URL}/api/token`} className="btn btn-primary m-5">
          Log In
        </a>
      )}
      {code && (
        <div className="flex flex-wrap gap-10">
          {playlists.map((playlist: Playlist) => (
            <div className="card w-96 bg-primary shadow-xl" key={playlist.id}>
              <figure><img src={playlist.images[0]!.url} alt={playlist.name} className="object-fit h-40 p-5"/></figure>
              <div className="card-body">
                <h2 className="card-title">{playlist.name}</h2>
                <div className="card-actions justify-end">
                  <a href="/" className="btn btn-secondary">Tracks</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export interface Token {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
};

export interface Playlist {
  collaborative: boolean,
  description: string,
  external_urls: object,
  href: string,
  id: number,
  images: { url: string, height: number, width: number, }[],
  name: string,
  owner: { external_urls: string, },
  public: boolean,
  snapshot_id: string,
  tracks: { href: string, total: number, },
  type: string,
  uri: string,
}

export interface PlaylistRes {
  href: string,
  limit: number,
  next?: string,
  offset: number,
  previous?: string,
  total: number,
  items: Playlist[],
}
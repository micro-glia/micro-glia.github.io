# microglia.eth — desktop portfolio

A self-contained, static macOS-style portfolio with functional Notes, Messages,
Finder, Photos, Music, Calendar, iTerm, System Settings, menu-bar controls, and
Dock interactions. All interface assets are bundled locally and there is no
build step or runtime backend.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

The interaction inventory is recorded in `REFERENCE-FUNCTIONALITY.md`.

## Private Spotify playlist sync

There is no Spotify login, import button, token storage, or Spotify API request
in the public website. Music only reads the committed
`assets/data/music-library.json` snapshot and locally hosted cover images.

The private build-time importer is distributed separately in the
`microglia-spotify-admin` package. Keep that folder outside this public GitHub
Pages repository. It binds only to `127.0.0.1`, requires an explicit playlist
allow-list, holds its access token in memory, downloads artwork into
`assets/music/`, and writes no credentials to disk.

One-time Spotify setup:

1. Create an app at `https://developer.spotify.com/dashboard`.
2. Add this exact Redirect URI:

   `http://127.0.0.1:8888/callback`

3. Find the Spotify IDs of only the playlists you are comfortable publishing.
   A playlist URL such as `https://open.spotify.com/playlist/ABC123` has the ID
   `ABC123`.

Run a sync from the separate admin folder:

```bash
cd "/path/to/microglia-spotify-admin"
export SPOTIFY_CLIENT_ID="your-client-id"
export SPOTIFY_PLAYLIST_IDS="first-id,second-id"
read -s "SPOTIFY_CLIENT_SECRET?Spotify Client Secret: "
export SPOTIFY_CLIENT_SECRET
node import-spotify.mjs
unset SPOTIFY_CLIENT_SECRET
```

Open the printed authorization URL, approve access, and return to Terminal.
Then inspect `assets/data/music-library.json`, preview the site locally, and
commit only after confirming every playlist and track is appropriate to make
public.

Anything placed in `music-library.json` is public by design. Private playlists
are never imported unless their IDs are explicitly included. `.env` files are
ignored by Git to help prevent accidental credential commits.

## Publish on GitHub Pages

Copy these files into the root of the `micro-glia.github.io` repository, commit, and push. No build step is required.

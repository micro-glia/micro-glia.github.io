const musicBanners = [
  { eyebrow: "A soundtrack for deep work", title: "Signal in the noise", copy: "Long arcs, patient builds, no interruptions.", tone: "violet" },
  { eyebrow: "After-hours rotation", title: "Night shift", copy: "Music for the stretch when the room gets quiet.", tone: "midnight" },
  { eyebrow: "Ideas need room", title: "Open field", copy: "A little motion, a little wonder, a lot of space.", tone: "sunset" }
];

let musicLibraryPro = { version: 1, playlists: [] };
let musicViewPro = "home";
let musicBannerIndex = 0;

function musicEscape(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function musicArt(item, className = "album-art") {
  if (item.image) return `<span class="${className} imported-art"><img src="${musicEscape(item.image)}" alt="${musicEscape(item.name || item.title || "Album artwork")}"></span>`;
  return `<span class="${className} art-${item.art || 1}"><span class="art-symbol">${musicEscape(item.emoji || "♫")}</span></span>`;
}

function allMusicTracks() {
  return musicLibraryPro.playlists.flatMap(playlist => playlist.tracks || []);
}

function syncLegacyPlayerTracks() {
  const flattened = allMusicTracks();
  musicTracks.splice(0, musicTracks.length, ...flattened.map((track, index) => ({
    title: track.title,
    artist: track.artist,
    album: track.album || "",
    time: track.time || "0:29",
    art: track.art || (index % 4) + 1,
    image: track.image || "",
    externalUrl: track.externalUrl || ""
  })));
}

function renderMusicSidebar() {
  const nav = document.querySelector("#musicNav");
  nav.innerHTML = `<button data-view="home">⌂ <span>Home</span></button><button data-view="browse">◉ <span>Browse</span></button><small>Library</small><button data-view="artists">♙ <span>Artists</span></button><button data-view="albums">◎ <span>Albums</span></button><button data-view="songs">♫ <span>Songs</span></button><small>Playlists</small>${musicLibraryPro.playlists.map(playlist => `<button data-view="playlist:${musicEscape(playlist.id)}">☷ <span>${musicEscape(playlist.emoji || "♫")} ${musicEscape(playlist.name)}</span></button>`).join("")}`;
  nav.querySelectorAll("button").forEach(button => button.addEventListener("click", () => renderMusicPro(button.dataset.view)));
  nav.querySelectorAll("button").forEach(button => button.classList.toggle("selected", button.dataset.view === musicViewPro));
}

function playlistCards(playlists = musicLibraryPro.playlists) {
  return `<div class="music-card-row">${playlists.map(playlist => `<button class="music-cover-card" data-playlist="${musicEscape(playlist.id)}">${musicArt(playlist)}<strong>${musicEscape(playlist.emoji || "♫")} ${musicEscape(playlist.name)}</strong><small>${playlist.tracks?.length || playlist.total || 0} songs</small></button>`).join("")}</div>`;
}

function songCards(tracks) {
  return `<div class="song-card-row">${tracks.slice(0, 12).map((track, index) => `<button class="song-card" data-track-pro="${index}" data-track-title="${musicEscape(track.title)}">${musicArt(track, "song-art")}<strong>${musicEscape(track.title)}</strong><small>${musicEscape(track.artist)}</small></button>`).join("")}</div>`;
}

function trackTablePro(tracks) {
  return `<table class="track-table pro"><thead><tr><th>#</th><th>Title</th><th>Album</th><th></th><th>Time</th></tr></thead><tbody>${tracks.map((track, index) => `<tr data-global-track="${allMusicTracks().indexOf(track)}"><td>${index + 1}</td><td><span class="track-title-cell">${musicArt(track, "track-art")}<span><strong>${musicEscape(track.title)}</strong><small>${musicEscape(track.artist)}</small></span></span></td><td>${musicEscape(track.album || "")}</td><td>${track.externalUrl ? `<a href="${musicEscape(track.externalUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${musicEscape(track.title)} on Spotify">↗</a>` : `<button aria-label="Favorite ${musicEscape(track.title)}">☆</button>`}</td><td>${musicEscape(track.time || "")}</td></tr>`).join("")}</tbody></table>`;
}

function bannerMarkup() {
  const banner = musicBanners[musicBannerIndex];
  return `<section class="music-editorial ${banner.tone}"><div class="banner-copy"><small>${banner.eyebrow}</small><h1>${banner.title}</h1><p>${banner.copy}</p><button data-banner-play>▶ Listen now</button></div><div class="banner-orbit"><i></i><i></i><i></i></div><div class="banner-dots">${musicBanners.map((_, index) => `<button aria-label="Show banner ${index + 1}" data-banner="${index}" class="${index === musicBannerIndex ? "selected" : ""}"></button>`).join("")}</div></section>`;
}

function renderMusicPro(view = musicViewPro) {
  musicViewPro = view;
  renderMusicSidebar();
  const tracks = allMusicTracks();
  if (view === "home") {
    musicContent.innerHTML = `${bannerMarkup()}<div class="music-section-title"><h2>Playlists</h2><span>${musicLibraryPro.playlists.length} collections</span></div>${playlistCards()}<div class="music-section-title"><h2>Songs</h2><button data-view-jump="songs">See All</button></div>${songCards(tracks)}`;
  } else if (view === "browse") {
    musicContent.innerHTML = `<div class="music-page-heading"><small>EDITOR'S DESK</small><h1>Browse</h1><p>Records and playlists for building, reading, and wandering.</p></div><div class="browse-panels"><button data-playlist="${musicEscape(musicLibraryPro.playlists[0]?.id || "")}" class="browse-panel warm"><small>START HERE</small><strong>Long-form focus</strong><span>Patient music for difficult problems.</span></button><button data-playlist="${musicEscape(musicLibraryPro.playlists[1]?.id || musicLibraryPro.playlists[0]?.id || "")}" class="browse-panel cool"><small>AFTER DARK</small><strong>Night architecture</strong><span>Momentum without the noise.</span></button></div><div class="music-section-title"><h2>Recently Added</h2></div>${playlistCards([...musicLibraryPro.playlists].reverse())}<div class="music-section-title"><h2>Top Songs</h2></div>${songCards(tracks.slice().reverse())}`;
  } else if (view === "artists") {
    const artists = [...new Set(tracks.flatMap(track => track.artist.split(", ")))].slice(0, 18);
    musicContent.innerHTML = `<div class="music-page-heading"><h1>Artists</h1></div><div class="artist-grid">${artists.map((artist, index) => `<button class="artist-card" data-artist="${musicEscape(artist)}"><span class="artist-portrait art-${(index % 4) + 1}">${musicEscape(artist.split(" ").map(word => word[0]).join("").slice(0, 2))}</span><strong>${musicEscape(artist)}</strong></button>`).join("")}</div>`;
  } else if (view === "albums") {
    const albums = [...new Map(tracks.map(track => [track.album, track])).values()].filter(track => track.album);
    musicContent.innerHTML = `<div class="music-page-heading"><h1>Albums</h1></div><div class="album-library-grid">${albums.map(track => `<button class="music-cover-card" data-album="${musicEscape(track.album)}">${musicArt(track)}<strong>${musicEscape(track.album)}</strong><small>${musicEscape(track.artist)}</small></button>`).join("")}</div>`;
  } else if (view === "songs") {
    musicContent.innerHTML = `<div class="music-page-heading"><h1>Songs</h1><p>${tracks.length} tracks across your library</p></div>${trackTablePro(tracks)}`;
  } else if (view.startsWith("artist:")) {
    const artist = view.slice(7), artistTracks = tracks.filter(track => track.artist.includes(artist));
    musicContent.innerHTML = `<div class="music-page-heading"><small>ARTIST</small><h1>${musicEscape(artist)}</h1></div>${trackTablePro(artistTracks)}`;
  } else if (view.startsWith("album:")) {
    const album = view.slice(6), albumTracks = tracks.filter(track => track.album === album);
    musicContent.innerHTML = `<div class="music-page-heading"><small>ALBUM</small><h1>${musicEscape(album)}</h1></div>${trackTablePro(albumTracks)}`;
  } else {
    const playlistId = view.replace("playlist:", "");
    const playlist = musicLibraryPro.playlists.find(item => item.id === playlistId) || musicLibraryPro.playlists[0];
    if (!playlist) return;
    musicContent.innerHTML = `<div class="playlist-head pro">${musicArt(playlist)}<div><small>PLAYLIST</small><h1>${musicEscape(playlist.emoji || "♫")} ${musicEscape(playlist.name)}</h1><p>${musicEscape(playlist.description || "A collection from the listening room.")}</p><button class="play-list">▶ Play</button>${playlist.externalUrl ? `<a class="spotify-source" href="${musicEscape(playlist.externalUrl)}" target="_blank" rel="noreferrer">Open on Spotify ↗</a>` : ""}</div></div>${playlist.tracks?.length ? trackTablePro(playlist.tracks) : `<div class="music-empty"><strong>No tracks in this snapshot yet.</strong><span>Run the private library sync before publishing.</span></div>`}`;
  }
  bindMusicProControls();
}

function bindMusicProControls() {
  musicContent.querySelectorAll("[data-playlist]").forEach(button => button.addEventListener("click", () => renderMusicPro(`playlist:${button.dataset.playlist}`)));
  musicContent.querySelectorAll("[data-view-jump]").forEach(button => button.addEventListener("click", () => renderMusicPro(button.dataset.viewJump)));
  musicContent.querySelectorAll("[data-banner]").forEach(button => button.addEventListener("click", () => { musicBannerIndex = +button.dataset.banner; renderMusicPro("home"); }));
  musicContent.querySelector("[data-banner-play]")?.addEventListener("click", () => startTrack(0));
  musicContent.querySelectorAll("[data-track-pro]").forEach(button => button.addEventListener("dblclick", () => {
    const index = musicTracks.findIndex(track => track.title === button.dataset.trackTitle);
    if (index >= 0) startTrack(index);
  }));
  musicContent.querySelectorAll("tr[data-global-track]").forEach(row => row.addEventListener("dblclick", event => { if (!event.target.closest("a,button")) startTrack(+row.dataset.globalTrack); }));
  musicContent.querySelectorAll("button[aria-label^='Favorite']").forEach(button => button.addEventListener("click", () => { button.textContent = button.textContent === "☆" ? "★" : "☆"; }));
  musicContent.querySelectorAll("[data-artist]").forEach(button => button.addEventListener("click", () => renderMusicPro(`artist:${button.dataset.artist}`)));
  musicContent.querySelectorAll("[data-album]").forEach(button => button.addEventListener("click", () => renderMusicPro(`album:${button.dataset.album}`)));
  musicContent.querySelector(".play-list")?.addEventListener("click", () => {
    const playlist = musicLibraryPro.playlists.find(item => `playlist:${item.id}` === musicViewPro);
    const firstTrack = playlist?.tracks?.[0];
    const index = musicTracks.findIndex(track => track.title === firstTrack?.title);
    if (index >= 0) startTrack(index);
  });
}

startTrack = function startTrackPro(index) {
  if (!musicTracks.length) return;
  trackIndex = (index + musicTracks.length) % musicTracks.length;
  const track = musicTracks[trackIndex];
  document.querySelector("#nowTitle").textContent = track.title;
  document.querySelector("#nowArtist").textContent = track.artist;
  const art = document.querySelector(".now-art");
  art.className = `now-art art-${track.art || 1}${track.image ? " imported-art" : ""}`;
  art.style.backgroundImage = track.image ? `url("${track.image.replace(/"/g, "")}")` : "";
  art.style.backgroundSize = track.image ? "contain" : "";
  musicPlayer.classList.remove("hidden");
  musicProgress.value = 0;
  document.querySelector("#elapsed").textContent = "0:00";
  isPlaying = true;
  document.querySelector("#playPause").textContent = "Ⅱ";
  clearInterval(musicTimer);
  musicTimer = setInterval(() => {
    if (!isPlaying) return;
    musicProgress.value = +musicProgress.value + 1;
    document.querySelector("#elapsed").textContent = `0:${String(musicProgress.value).padStart(2, "0")}`;
    if (+musicProgress.value >= 29) startTrack(trackIndex + 1);
  }, 1000);
};

async function loadPackagedMusicLibrary() {
  try {
    const response = await fetch("assets/data/music-library.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No library snapshot");
    musicLibraryPro = await response.json();
  } catch {
    musicLibraryPro = { version: 1, playlists: [] };
  }
  syncLegacyPlayerTracks();
  renderMusicPro("home");
}

loadPackagedMusicLibrary();
setInterval(() => {
  if (musicViewPro !== "home" || document.querySelector("#musicWindow").classList.contains("hidden")) return;
  musicBannerIndex = (musicBannerIndex + 1) % musicBanners.length;
  renderMusicPro("home");
}, 5000);

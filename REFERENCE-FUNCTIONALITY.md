# Desktop interaction parity map

This document records the interaction model used as the reference for the local desktop portfolio. The implementation uses original local content and local assets; it does not contact the reference site at runtime.

## Global shell

- Apple menu: About, System Settings, and local feedback for power-session commands.
- Application menu: About, Settings, Hide, and Quit update with the focused application.
- Menu bar: active application name changes with window focus. Notes exposes File; Finder exposes View. Other apps show only the application menu.
- Status area: Battery, Wi-Fi, and Control Center open glass popovers with functional toggles and sliders. The clock updates locally and reports the full date when selected.
- Windows: focus/raise, drag from toolbars, close, minimize, maximize, and restore from Dock.
- Dock: Gaussian 1.4× magnification, expanding button widths, running indicators, delayed labels, and app restore/open behavior.
- Games: intentionally excluded.

## Applications

- Notes: grouped notes, search, selection, URL hash, list/gallery display, title/manual sorting, date-group visibility, create, pin/unpin, delete, and keyboard new-note shortcut.
- Messages: conversation search and selection, new-conversation focus, local message composition and delivery state.
- Finder: sidebar locations, selectable files, search, list/icon views, Trash location.
- Photos: Library/Favorites/albums navigation, Years/Months/All Photos scopes, gallery filters, and photo viewer.
- Music: Home, Browse, Artists, Albums, Songs, playlists, track selection, play/pause, previous/next, scrubber, favorite, shuffle, repeat, mute, and queue feedback. Playback is a silent local simulation to avoid remote media dependencies.
- Calendar: month navigation and day selection.
- iTerm: local command prompt supporting `help`, `about`, `notes`, `music`, `date`, `whoami`, and `clear`.
- System Settings: category navigation, appearance, clock visibility, connectivity toggles, wallpaper information, and Focus state.
- Trash: opens Finder at the Trash location.

## Intentionally inert or constrained

- External content links in notes navigate normally, but no external resource is loaded by the desktop shell.
- Music does not stream copyrighted audio.
- Finder represents the portfolio package; it cannot access a visitor's real filesystem.
- Settings affect only this page and do not change the visitor's operating system.

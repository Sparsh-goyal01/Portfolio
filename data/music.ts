export interface MusicTrackConfig {
  title: string;
  src: string;
  volume: number;
}

/**
 * Portfolio background audio configuration.
 * Place your licensed/original MP3 at `public/music/portfolio-theme.mp3`
 * or update `src` and `title` below to switch tracks.
 */
export const portfolioMusicTrack: MusicTrackConfig = {
  title: "Dark Workspace",
  src: "/music/portfolio-theme.mp3",
  volume: 0.45,
};


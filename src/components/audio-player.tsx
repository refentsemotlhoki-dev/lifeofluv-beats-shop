import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Beat } from "@/data/beats";

type PlayerState = {
  current: Beat | null;
  playing: boolean;
  toggle: (beat: Beat) => void;
  isActive: (slug: string) => boolean;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function usePreviewPlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePreviewPlayer must be used inside PreviewPlayerProvider");
  return ctx;
}

export function PreviewPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Beat | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(
    (beat: Beat) => {
      if (!beat.preview) return;
      const audio = audioRef.current;
      if (!audio) return;

      if (current?.slug === beat.slug) {
        if (audio.paused) {
          void audio.play();
        } else {
          audio.pause();
        }
        return;
      }

      setCurrent(beat);
      audio.src = beat.preview;
      void audio.play();
    },
    [current],
  );

  const isActive = useCallback(
    (slug: string) => playing && current?.slug === slug,
    [playing, current],
  );

  const value = useMemo(
    () => ({ current, playing, toggle, isActive }),
    [current, playing, toggle, isActive],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} preload="none" className="hidden" />
      <NowPlayingBar />
    </PlayerContext.Provider>
  );
}

function NowPlayingBar() {
  const { current, playing, toggle } = usePreviewPlayer();
  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <img
          src={current.artwork}
          alt=""
          className="h-11 w-11 rounded-sm object-cover ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm">{current.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {current.bpm} BPM · {current.key}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggle(current)}
          aria-label={playing ? `Pause ${current.title} preview` : `Play ${current.title} preview`}
          className="btn-base btn-platinum"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}

export function PlayPreviewButton({
  beat,
  variant = "solid",
  className = "",
}: {
  beat: Beat;
  variant?: "solid" | "icon";
  className?: string;
}) {
  const { toggle, isActive } = usePreviewPlayer();
  const active = isActive(beat.slug);
  const unavailable = !beat.preview;

  const handle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggle(beat);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handle}
        disabled={unavailable}
        aria-label={
          unavailable
            ? `${beat.title} preview coming soon`
            : active
              ? `Pause ${beat.title} preview`
              : `Play ${beat.title} preview`
        }
        title={unavailable ? "Preview coming soon" : undefined}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      >
        <span aria-hidden className="text-sm">
          {active ? "❚❚" : "▶"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={unavailable}
      className={`btn-base btn-platinum disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {unavailable ? "Preview coming soon" : active ? "Pause preview" : "Play preview"}
    </button>
  );
}

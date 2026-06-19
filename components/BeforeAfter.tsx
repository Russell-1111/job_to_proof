"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Vehicle interior before detailing",
  afterAlt = "Vehicle interior after detailing",
  compact = false,
  priority = false
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  compact?: boolean;
  priority?: boolean;
}) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const sizes = compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 52vw, 100vw";
  const beforeUnoptimized = beforeSrc.startsWith("data:") || beforeSrc.startsWith("blob:");
  const afterUnoptimized = afterSrc.startsWith("data:") || afterSrc.startsWith("blob:");
  const clampPosition = (value: number) => Math.min(100, Math.max(0, value));
  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clampPosition(Math.round(nextPosition)));
  }, []);
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) {
      return;
    }

    updateFromClientX(event.clientX);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => clampPosition(value - step));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => clampPosition(value + step));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <figure
      className={`relative isolate self-start overflow-hidden rounded-lg border border-white/10 bg-panel shadow-[0_24px_70px_rgba(0,0,0,0.34)] ${
        compact ? "w-full" : "gold-ring"
      }`}
    >
      <div
        ref={frameRef}
        aria-label="Drag to compare before and after detailing photos"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={position}
        aria-valuetext={`${position}% after photo visible`}
        className="relative aspect-[4/3] cursor-ew-resize overflow-hidden [touch-action:pan-y]"
        role="slider"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <Image src={beforeSrc} alt={beforeAlt} fill priority={priority} unoptimized={beforeUnoptimized} className="object-cover" sizes={sizes} />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={afterSrc} alt={afterAlt} fill priority={priority} unoptimized={afterUnoptimized} className="object-cover" sizes={sizes} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2 sm:p-3">
          <span className="rounded-md border border-white/10 bg-black/55 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
            Before
          </span>
          <span className="rounded-md border border-gold/30 bg-gold/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-glow">
            After
          </span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-white/85 shadow-[0_0_24px_rgba(255,255,255,0.45)]" style={{ left: `${position}%` }} />
        <div
          className="pointer-events-none absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/65 text-white shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-md"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="h-5 w-px bg-white/80" />
          <span className="absolute h-px w-5 bg-white/80" />
        </div>
      </div>
      {!compact && (
        <figcaption className="border-t border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-steel">
          Drag the handle to compare the vehicle before and after the detail.
        </figcaption>
      )}
    </figure>
  );
}

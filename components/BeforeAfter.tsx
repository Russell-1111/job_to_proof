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
  return (
    <div className={`grid self-start items-start gap-3 ${compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
      <figure className="overflow-hidden rounded-lg border border-white/10 bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        <div className="relative aspect-[4/3]">
          <Image src={beforeSrc} alt={beforeAlt} fill priority={priority} className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
        </div>
        <figcaption className="border-t border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-steel">
          Before
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-lg border border-gold/25 bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        <div className="relative aspect-[4/3]">
          <Image src={afterSrc} alt={afterAlt} fill priority={priority} className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
        </div>
        <figcaption className="border-t border-gold/20 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          After
        </figcaption>
      </figure>
    </div>
  );
}

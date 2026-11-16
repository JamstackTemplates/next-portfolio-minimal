import type { ReactNode } from 'react';

/** Heading block for inner pages: eyebrow, large serif title and an optional lede. */
export function PageHead({ eyebrow, title, children, id, after }: {
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Extra content under the lede, e.g. project facts. */
  after?: ReactNode;
}) {
  return (
    <header className="wrap pt-[clamp(3rem,8vw,6rem)]">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={id} className="mb-5 font-serif text-[clamp(2.25rem,5.5vw,4rem)] tracking-[-.015em] wrap-anywhere">{title}</h1>
      {children ? <div className="max-w-(--measure) text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.55] text-muted">{children}</div> : null}
      {after}
    </header>
  );
}

import type { ReactNode } from 'react';

/** Heading block for inner pages: eyebrow, large display title and an optional lede. */
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
      <h1 id={id} className="display mb-6 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5.25rem)] wrap-anywhere">{title}</h1>
      {children ? <div className="max-w-(--measure) text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.5] text-muted">{children}</div> : null}
      {after}
    </header>
  );
}

import type { ProjectImage as Image } from '../content/projects';
import { asset } from '../lib/paths';

type Props = {
  image: Image;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  eager?: boolean;
  sizes?: string;
  className?: string;
};

/** Local, pre-sized project visual. Explicit dimensions reserve space and avoid layout shift. */
export function ProjectImage({ image, eager = false, className }: Props) {
  return (
    // Static export: no image optimisation server, so a plain responsive <img> is the honest choice.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={asset(image.src)}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
    />
  );
}

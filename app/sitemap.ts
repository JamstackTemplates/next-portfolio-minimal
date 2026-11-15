import type { MetadataRoute } from 'next';
import { projects } from '../content/projects';
import { absoluteUrl, projectRoute } from '../lib/paths';

export const dynamic = 'force-static';

// Sitemaps need absolute URLs. When the deployed URL is unknown at build time the sitemap is empty
// rather than pointing at a guessed or localhost origin.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/work/', ...projects.map(project => projectRoute(project.slug)), '/about/', '/contact/'];
  return routes.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}

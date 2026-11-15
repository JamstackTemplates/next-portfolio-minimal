import type { Metadata } from 'next';
import { SiteLink } from '../components/site-link';
import { projects } from '../content/projects';
import { projectRoute } from '../lib/paths';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap page-head not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title" className="page-head__title">This page isn’t here</h1>
      <p className="lede">The link may be out of date, or the page may have moved. These might help:</p>
      <ul className="link-list link-list--large">
        <li><SiteLink href="/" className="text-link">Home</SiteLink></li>
        <li><SiteLink href="/work/" className="text-link">All work</SiteLink></li>
        {projects.map(project => (
          <li key={project.slug}><SiteLink href={projectRoute(project.slug)} className="text-link">{project.title}</SiteLink></li>
        ))}
        <li><SiteLink href="/contact/" className="text-link">Contact</SiteLink></li>
      </ul>
    </section>
  );
}

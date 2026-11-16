import type { Metadata } from 'next';
import { SiteLink } from '../components/site-link';
import { PageHead } from '../components/page-head';
import { projects } from '../content/projects';
import { projectRoute } from '../lib/paths';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[50vh]" aria-labelledby="not-found-title">
      <PageHead id="not-found-title" eyebrow="404" title="This page isn’t here">
        <p>The link may be out of date, or the page may have moved. These might help:</p>
      </PageHead>
      <ul className="wrap mt-8 grid gap-2.5 text-[1.15rem]">
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

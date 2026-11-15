import type { Metadata } from 'next';
import { ProjectList } from '../../components/project-list';
import { projects } from '../../content/projects';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
  alternates: { canonical: absoluteUrl('/work/') },
};

export default function WorkPage() {
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Work</p>
        <h1 className="page-head__title">Selected projects</h1>
        <p className="lede">
          A few recent projects, each with notes on the problem, the approach and what I learned along the way.
        </p>
      </header>
      <section className="wrap section section--tight" aria-label="Projects">
        <ProjectList projects={projects} headingLevel="h2" eagerFirst />
      </section>
    </>
  );
}

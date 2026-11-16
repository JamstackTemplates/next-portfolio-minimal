import type { Metadata } from 'next';
import { ProjectList } from '../../components/project-list';
import { PageHead } from '../../components/page-head';
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
      <PageHead eyebrow="Work" title="Selected projects">
        <p>A few recent projects, each with notes on the problem, the approach and what I learned along the way.</p>
      </PageHead>
      <section className="wrap pt-[clamp(2.5rem,5vw,3.5rem)]" aria-label="Projects">
        <ProjectList projects={projects} headingLevel="h2" eagerFirst />
      </section>
    </>
  );
}

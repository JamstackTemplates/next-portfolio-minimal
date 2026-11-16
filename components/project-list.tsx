import type { Project } from '../content/projects';
import { projectRoute } from '../lib/paths';
import { ProjectImage } from './project-image';
import { SiteLink } from './site-link';

type Props = {
  projects: Project[];
  /** Heading level for project titles, to keep the page outline correct. */
  headingLevel?: 'h2' | 'h3';
  eagerFirst?: boolean;
};

/** Whole-entry project links: image, title, summary and discipline/year. Images alternate sides. */
export function ProjectList({ projects, headingLevel: Heading = 'h2', eagerFirst = false }: Props) {
  return (
    <ul className="grid gap-[clamp(3rem,7vw,5.5rem)]">
      {projects.map((project, index) => (
        <li key={project.slug} className="group/entry">
          <SiteLink href={projectRoute(project.slug)}
            className="group grid items-center gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-6 rounded-ui text-inherit no-underline md:grid-cols-[7fr_5fr] md:group-even/entry:grid-cols-[5fr_7fr]">
            <div className="framed overflow-hidden transition duration-350 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-1.5 group-hover:shadow-[var(--elev-2),0_30px_60px_-24px_color-mix(in_srgb,var(--accent)_45%,transparent)] md:group-even/entry:order-2">
              <ProjectImage image={project.cover} eager={eagerFirst && index === 0}
                className="aspect-[16/10] w-full object-cover transition-transform duration-600 group-hover:scale-[1.03]" />
            </div>
            <div>
              <p className="font-mono text-[.8125rem] font-medium tracking-[.02em] text-accent-2">
                <span>{project.discipline}</span>
                <span aria-hidden="true"> · </span>
                <span>{project.year}</span>
              </p>
              <Heading className="mt-2 mb-3 font-serif text-[clamp(1.6rem,3vw,2.25rem)] wrap-anywhere decoration-accent decoration-1 underline-offset-[.15em] group-hover:underline group-focus-visible:underline">
                {project.title}
              </Heading>
              <p className="max-w-md text-muted">{project.summary}</p>
              <span className="mt-6 inline-block rounded-full bg-accent-soft px-[.95rem] py-[.45rem] text-[.9375rem] font-semibold text-accent-strong transition duration-200 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-on-accent" aria-hidden="true">
                View case study →
              </span>
            </div>
          </SiteLink>
        </li>
      ))}
    </ul>
  );
}

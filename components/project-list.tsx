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

/**
 * Whole-entry project links. The first project leads at full width with its text beside the image;
 * the rest follow two to a row, like a magazine contents spread.
 */
export function ProjectList({ projects, headingLevel: Heading = 'h2', eagerFirst = false }: Props) {
  return (
    <ul className="grid gap-x-[clamp(1.5rem,4vw,3rem)] gap-y-[clamp(3rem,7vw,5rem)] md:grid-cols-2">
      {projects.map((project, index) => {
        const lead = index === 0;
        return (
          <li key={project.slug} className={lead ? 'md:col-span-2' : undefined}>
            <SiteLink href={projectRoute(project.slug)}
              className={`group grid gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-6 rounded-ui text-inherit no-underline ${lead ? 'lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end' : ''}`}>
              <div className="framed overflow-hidden transition-shadow duration-300 group-hover:shadow-[var(--elev-2),0_0_0_2px_var(--accent)]">
                <ProjectImage image={project.cover} eager={eagerFirst && lead}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]" />
              </div>
              <div className={lead ? 'lg:pb-2' : undefined}>
                <p className="flex flex-wrap gap-x-3 text-[.9375rem] text-muted">
                  <span className="tabular-nums font-semibold text-ink">{project.year}</span>
                  <span>{project.discipline}</span>
                </p>
                <Heading className={`mt-2 mb-3 font-bold tracking-[-.025em] wrap-anywhere decoration-accent decoration-2 underline-offset-[.14em] group-hover:underline group-focus-visible:underline ${lead ? 'text-[clamp(2rem,4vw,3rem)] leading-[1.02]' : 'text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.08]'}`}>
                  {project.title}
                </Heading>
                <p className="max-w-md text-muted">{project.summary}</p>
                <p className="mt-5 text-[.9375rem] font-semibold text-accent" aria-hidden="true">Read the case study</p>
              </div>
            </SiteLink>
          </li>
        );
      })}
    </ul>
  );
}

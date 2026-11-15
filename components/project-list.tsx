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

/** Whole-entry project links: image, title, summary and discipline/year. */
export function ProjectList({ projects, headingLevel: Heading = 'h2', eagerFirst = false }: Props) {
  return (
    <ul className="project-list">
      {projects.map((project, index) => (
        <li key={project.slug} className="project-entry">
          <SiteLink href={projectRoute(project.slug)} className="project-entry__link">
            <div className="project-entry__media">
              <ProjectImage image={project.cover} eager={eagerFirst && index === 0} />
            </div>
            <div className="project-entry__text">
              <p className="meta">
                <span>{project.discipline}</span>
                <span aria-hidden="true"> · </span>
                <span>{project.year}</span>
              </p>
              <Heading className="project-entry__title">{project.title}</Heading>
              <p className="project-entry__summary">{project.summary}</p>
              <span className="project-entry__cta" aria-hidden="true">View case study →</span>
            </div>
          </SiteLink>
        </li>
      ))}
    </ul>
  );
}

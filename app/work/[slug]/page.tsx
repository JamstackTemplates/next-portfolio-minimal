import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectImage } from '../../../components/project-image';
import { SiteLink } from '../../../components/site-link';
import { getNextProject, getProject, projects } from '../../../content/projects';
import { absoluteUrl, projectRoute } from '../../../lib/paths';
import { site } from '../../../lib/site';

// Only the projects in content/projects.ts exist; anything else is the static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Social networks generally reject SVG previews, so vector covers fall back to the site-wide PNG.
  const raster = /\.(png|jpe?g|webp)$/i.test(project.cover.src);
  const image = site.url
    ? [raster ? { url: `${site.url}${project.cover.src}`, alt: project.cover.alt } : { url: `${site.url}/og.png`, width: 1200, height: 630 }]
    : undefined;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: absoluteUrl(projectRoute(project.slug)) },
    openGraph: { type: 'article', title: project.title, description: project.summary, images: image },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <article className="case-study">
      <header className="wrap page-head">
        <p className="eyebrow"><SiteLink href="/work/" className="back-link">Work</SiteLink></p>
        <h1 className="page-head__title">{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <dl className="facts">
          <div><dt>Client</dt><dd>{project.client}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Team</dt><dd>{project.team}</dd></div>
          <div><dt>Year</dt><dd>{project.year} · {project.duration}</dd></div>
        </dl>
      </header>

      <figure className="wrap wrap--wide case-study__cover">
        <ProjectImage image={project.cover} eager />
        {project.cover.caption ? <figcaption>{project.cover.caption}</figcaption> : null}
      </figure>

      <div className="wrap case-study__body">
        <section className="case-section" aria-labelledby="overview">
          <h2 id="overview">Overview</h2>
          <div className="prose"><p className="lede">{project.overview}</p></div>
        </section>

        {project.sections.map((section, index) => {
          const id = `section-${index + 1}`;
          return (
            <section key={section.heading} className="case-section" aria-labelledby={id}>
              <h2 id={id}>{section.heading}</h2>
              <div className="prose">
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {section.points?.length ? (
                  <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>
                ) : null}
              </div>
              {section.image ? (
                <figure className="case-section__figure">
                  <ProjectImage image={section.image} />
                  {section.image.caption ? <figcaption>{section.image.caption}</figcaption> : null}
                </figure>
              ) : null}
            </section>
          );
        })}

        <section className="case-section" aria-labelledby="lessons">
          <h2 id="lessons">What I learned</h2>
          <div className="prose">
            <ul>{project.lessons.map(lesson => <li key={lesson}>{lesson}</li>)}</ul>
          </div>
        </section>

        {project.links.length ? (
          <section className="case-section" aria-labelledby="links">
            <h2 id="links">Links</h2>
            <ul className="link-list">
              {project.links.map(link => <li key={link.url}><a className="text-link" href={link.url}>{link.label}</a></li>)}
            </ul>
          </section>
        ) : null}

        <ul className="tag-list" aria-label="Topics">
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>

      <nav className="wrap next-project" aria-label="More work">
        {next ? (
          <SiteLink href={projectRoute(next.slug)} className="next-project__link">
            <span className="eyebrow">Next project</span>
            <span className="next-project__title">{next.title}</span>
            <span className="next-project__summary">{next.summary}</span>
          </SiteLink>
        ) : null}
        <p className="next-project__contact">
          Working on something similar? <SiteLink href="/contact/" className="text-link">Let’s talk</SiteLink>
        </p>
      </nav>
    </article>
  );
}

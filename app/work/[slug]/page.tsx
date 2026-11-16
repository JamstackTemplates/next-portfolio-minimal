import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHead } from '../../../components/page-head';
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

const caseSection = 'grid gap-x-12 gap-y-4 md:grid-cols-[minmax(10rem,1fr)_3fr]';
const caseHeading = 'pt-1 font-mono text-[.8125rem] font-medium tracking-[.02em] text-accent';
const caption = 'mt-3.5 text-[.9375rem] text-muted';

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
    <article>
      <PageHead
        eyebrow={<SiteLink href="/work/" className="text-muted no-underline before:content-['←_'] hover:text-accent">Work</SiteLink>}
        title={project.title}
        after={
          <dl className="mt-11 grid gap-x-8 gap-y-5 border-t border-line pt-6 xs:grid-cols-2 md:grid-cols-4">
            {[['Client', project.client], ['Role', project.role], ['Team', project.team], ['Year', `${project.year} · ${project.duration}`]].map(([term, value]) => (
              <div key={term}>
                <dt className="mb-1.5 font-mono text-[.8125rem] text-accent-2">{term}</dt>
                <dd className="text-[.9875rem] leading-normal">{value}</dd>
              </div>
            ))}
          </dl>
        }>
        <p>{project.summary}</p>
      </PageHead>

      <figure className="wrap wrap-wide mt-[clamp(2.5rem,6vw,4rem)]">
        <ProjectImage image={project.cover} eager className="framed w-full" />
        {project.cover.caption ? <figcaption className={caption}>{project.cover.caption}</figcaption> : null}
      </figure>

      <div className="wrap grid gap-[clamp(3rem,6vw,4.5rem)] pt-[clamp(3rem,7vw,5rem)]">
        <section className={caseSection} aria-labelledby="overview">
          <h2 id="overview" className={caseHeading}>Overview</h2>
          <div className="prose"><p className="max-w-(--measure) text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.55] text-ink">{project.overview}</p></div>
        </section>

        {project.sections.map((section, index) => {
          const id = `section-${index + 1}`;
          return (
            <section key={section.heading} className={caseSection} aria-labelledby={id}>
              <h2 id={id} className={caseHeading}>{section.heading}</h2>
              <div className="prose">
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {section.points?.length ? (
                  <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>
                ) : null}
              </div>
              {section.image ? (
                <figure className="col-span-full mt-6">
                  <ProjectImage image={section.image} className="framed w-full" />
                  {section.image.caption ? <figcaption className={caption}>{section.image.caption}</figcaption> : null}
                </figure>
              ) : null}
            </section>
          );
        })}

        <section className={caseSection} aria-labelledby="lessons">
          <h2 id="lessons" className={caseHeading}>What I learned</h2>
          <div className="prose">
            <ul>{project.lessons.map(lesson => <li key={lesson}>{lesson}</li>)}</ul>
          </div>
        </section>

        {project.links.length ? (
          <section className={caseSection} aria-labelledby="links">
            <h2 id="links" className={caseHeading}>Links</h2>
            <ul className="grid gap-2.5">
              {project.links.map(link => <li key={link.url}><a className="text-link" href={link.url}>{link.label}</a></li>)}
            </ul>
          </section>
        ) : null}

        <ul className="tag-list pt-2" aria-label="Topics">
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>

      <nav className="wrap mt-(--space-section) grid gap-8" aria-label="More work">
        {next ? (
          <SiteLink href={projectRoute(next.slug)} className="group grid gap-1 border-y border-line py-[clamp(1.75rem,4vw,3rem)] no-underline">
            <span className="eyebrow mb-2 before:hidden">Next project</span>
            <span className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.15] group-hover:text-accent">{next.title}</span>
            <span className="text-muted">{next.summary}</span>
          </SiteLink>
        ) : null}
        <p className="text-muted">
          Working on something similar? <SiteLink href="/contact/" className="text-link">Let’s talk</SiteLink>
        </p>
      </nav>
    </article>
  );
}

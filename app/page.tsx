import type { Metadata } from 'next';
import { ProjectList } from '../components/project-list';
import { SiteLink } from '../components/site-link';
import { profile } from '../content/profile';
import { featuredProjects } from '../content/projects';
import { absoluteUrl, projectRoute } from '../lib/paths';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <section className="wrap pt-[clamp(2.5rem,7vw,5.5rem)]" aria-labelledby="intro-title">
        <div className="intro">
          <p className="mb-[clamp(1.5rem,3vw,2.25rem)] flex flex-wrap items-center gap-x-5 gap-y-3 text-[.9375rem] text-muted">
            {profile.availability ? (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 font-medium text-ink shadow-card">
                <span className="availability-dot size-2 flex-none rounded-full bg-success" aria-hidden="true" />{profile.availability}
              </span>
            ) : null}
            <span>{profile.role}, {profile.location}</span>
          </p>

          <h1 id="intro-title" className="display max-w-[15ch] text-[clamp(2.75rem,8.4vw,7.25rem)]">
            {profile.headline}
          </h1>

          <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-[clamp(2rem,6vw,5rem)] gap-y-12 border-t-2 border-ink pt-[clamp(1.75rem,3.5vw,2.5rem)] md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div>
              <p className="max-w-[34rem] text-[clamp(1.125rem,1.7vw,1.3rem)] leading-[1.5] text-muted">{profile.introduction}</p>
              <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <SiteLink href="/work/" className="button">See selected work</SiteLink>
                <SiteLink href="/contact/" className="text-link font-medium">Get in touch</SiteLink>
              </p>
            </div>

            {/* A table of contents for the work below: year, title and discipline. */}
            <nav aria-labelledby="index-title">
              <h2 id="index-title" className="section-title mb-2 text-muted">Recent projects</h2>
              <ul>
                {featuredProjects.map(project => (
                  <li key={project.slug} className="border-b border-line last:border-b-0">
                    <SiteLink href={projectRoute(project.slug)}
                      className="group grid grid-cols-[3.25rem_1fr] items-baseline gap-x-3 py-3 no-underline">
                      <span className="text-[.9375rem] tabular-nums text-muted">{project.year}</span>
                      <span>
                        <span className="block font-semibold decoration-accent decoration-2 underline-offset-[.2em] group-hover:text-accent group-hover:underline">{project.title}</span>
                        <span className="block text-[.9375rem] text-muted">{project.discipline}</span>
                      </span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section className="wrap section-top" aria-labelledby="work-title">
        <div className="rule-head mb-[clamp(2rem,4vw,3rem)]">
          <h2 id="work-title" className="section-title">Selected work</h2>
          <SiteLink href="/work/" className="text-link text-[.9375rem]">All projects</SiteLink>
        </div>
        <ProjectList projects={featuredProjects} headingLevel="h3" eagerFirst />
      </section>

      <section className="wrap section-top" aria-labelledby="about-title">
        <div className="rule-head mb-8"><h2 id="about-title" className="section-title">About</h2></div>
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-[minmax(0,3fr)_minmax(10rem,1fr)] md:items-end">
          <p className="max-w-[44rem] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.3] font-medium tracking-[-.015em]">{profile.summary}</p>
          <p className="md:justify-self-end"><SiteLink href="/about/" className="text-link">More about how I work</SiteLink></p>
        </div>
      </section>

      <section className="panel mx-auto mt-(--space-section) w-[calc(100%-2*var(--gutter))] max-w-(--page) rounded-card bg-panel px-[clamp(2rem,6vw,4.5rem)] py-[clamp(2.75rem,7vw,5rem)] text-on-panel print:bg-transparent print:text-inherit" aria-labelledby="cta-title">
        <div className="cta-panel grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h2 id="cta-title" className="display mb-5 text-[clamp(2.25rem,5.5vw,4rem)]">Have a project in mind?</h2>
            <p className="max-w-(--measure) text-lg text-on-panel/80">
              Tell me a little about it — what you’re making, who it’s for and when you’d like to start.
            </p>
          </div>
          <p><SiteLink href="/contact/" className="button button-marker">Start a conversation</SiteLink></p>
        </div>
      </section>
    </>
  );
}

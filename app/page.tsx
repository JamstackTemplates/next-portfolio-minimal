import type { Metadata } from 'next';
import { ProjectList } from '../components/project-list';
import { SiteLink } from '../components/site-link';
import { profile } from '../content/profile';
import { featuredProjects } from '../content/projects';
import { absoluteUrl } from '../lib/paths';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <section className="wrap intro pt-[clamp(3rem,9vw,7rem)] pb-[clamp(2rem,5vw,3rem)]" aria-labelledby="intro-title">
        <p className="eyebrow">{profile.role}</p>
        <h1 id="intro-title" className="max-w-[54rem] font-serif text-[clamp(2.1rem,5.2vw,4rem)] leading-[1.12] tracking-[-.01em] text-muted">
          <span className="text-accent italic">{profile.name}.</span> {profile.introduction}
        </h1>
        <p className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <SiteLink href="/work/" className="button">See selected work</SiteLink>
          <SiteLink href="/contact/" className="text-link">Get in touch</SiteLink>
        </p>
      </section>

      <section className="wrap section-top" aria-labelledby="work-title">
        <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-line pb-5 [background:linear-gradient(90deg,var(--accent),var(--accent-2))_left_bottom/6rem_2px_no-repeat]">
          <h2 id="work-title" className="section-title">Selected work</h2>
          <SiteLink href="/work/" className="text-link">All projects</SiteLink>
        </div>
        <ProjectList projects={featuredProjects} headingLevel="h3" eagerFirst />
      </section>

      <section className="wrap section-top grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="about-title">
        <h2 id="about-title" className="section-title md:pt-1.5">About</h2>
        <div className="prose">
          <p className="max-w-(--measure) text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.55] text-muted">{profile.summary}</p>
          <p><SiteLink href="/about/" className="text-link">More about how I work</SiteLink></p>
        </div>
      </section>

      <section className="cta-panel relative isolate mx-auto mt-(--space-section) w-[calc(100%-2*var(--gutter))] max-w-(--page) overflow-hidden rounded-card bg-panel px-[clamp(1.5rem,6vw,4.5rem)] py-[clamp(2.5rem,7vw,5rem)] text-on-panel shadow-lift print:bg-transparent print:text-inherit print:shadow-none" aria-labelledby="cta-title">
        <h2 id="cta-title" className="mb-4 font-serif text-[clamp(2.1rem,5vw,3.5rem)]">Have a project in mind?</h2>
        <p className="mb-8 max-w-(--measure) text-lg text-on-panel/80">
          Tell me a little about it — what you’re making, who it’s for and when you’d like to start.
          {profile.availability ? ` ${profile.availability}` : ''}
        </p>
        <p><SiteLink href="/contact/" className="button">Start a conversation</SiteLink></p>
      </section>
    </>
  );
}

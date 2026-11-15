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
      <section className="wrap intro" aria-labelledby="intro-title">
        <p className="eyebrow">{profile.role}</p>
        <h1 id="intro-title" className="intro__title">
          <span className="intro__name">{profile.name}.</span> {profile.introduction}
        </h1>
        <p className="intro__actions">
          <SiteLink href="/work/" className="button">See selected work</SiteLink>
          <SiteLink href="/contact/" className="text-link">Get in touch</SiteLink>
        </p>
      </section>

      <section className="wrap section" aria-labelledby="work-title">
        <div className="section__head">
          <h2 id="work-title" className="section__title">Selected work</h2>
          <SiteLink href="/work/" className="text-link">All projects</SiteLink>
        </div>
        <ProjectList projects={featuredProjects} headingLevel="h3" eagerFirst />
      </section>

      <section className="wrap section split" aria-labelledby="about-title">
        <h2 id="about-title" className="section__title">About</h2>
        <div className="prose">
          <p className="lede">{profile.summary}</p>
          <p><SiteLink href="/about/" className="text-link">More about how I work</SiteLink></p>
        </div>
      </section>

      <section className="wrap section cta" aria-labelledby="cta-title">
        <h2 id="cta-title" className="cta__title">Have a project in mind?</h2>
        <p className="cta__text">
          Tell me a little about it — what you’re making, who it’s for and when you’d like to start.
          {profile.availability ? ` ${profile.availability}` : ''}
        </p>
        <p><SiteLink href="/contact/" className="button">Start a conversation</SiteLink></p>
      </section>
    </>
  );
}

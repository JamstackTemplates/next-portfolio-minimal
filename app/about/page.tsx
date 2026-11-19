import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { profile, publicLinks } from '../../content/profile';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${profile.name}: background, strengths and way of working.`,
  alternates: { canonical: absoluteUrl('/about/') },
};

const sectionTitle = 'section-title md:pt-1';

export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="About" title={profile.name}>
        <p>{profile.role}. {profile.location}.</p>
      </PageHead>

      <section className="wrap pt-[clamp(2.5rem,5vw,3.5rem)] grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="bio-title">
        <h2 id="bio-title" className={sectionTitle}>Background</h2>
        <div className="prose">
          {profile.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="wrap section-top grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="strengths-title">
        <h2 id="strengths-title" className={sectionTitle}>What I do</h2>
        <div>
          <dl className="mb-10 grid gap-x-8 gap-y-6 md:grid-cols-3">
            {profile.strengths.map(item => (
              <div key={item.title}>
                <dt className="mb-2 border-t-2 border-accent pt-4 text-[1.3rem] font-semibold tracking-[-.015em]">{item.title}</dt>
                <dd className="text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mb-3 text-[.9375rem] font-semibold text-muted">Tools and skills</h3>
          <ul className="tag-list">{profile.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </div>
      </section>

      <section className="wrap section-top grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="approach-title">
        <h2 id="approach-title" className={sectionTitle}>How I work</h2>
        <ol className="steps grid max-w-(--measure) gap-7">
          {profile.approach.map(step => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-4">
              <h3 className="mb-1.5 text-[1.3rem] font-semibold tracking-[-.015em]">{step.title}</h3>
              <p className="text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section-top grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="experience-title">
        <h2 id="experience-title" className={sectionTitle}>Experience</h2>
        <ul className="grid max-w-[46rem] gap-6">
          {profile.experience.map(item => (
            <li key={item.period + item.title} className="grid gap-x-6 gap-y-1 border-b border-line pb-6 last:border-b-0 last:pb-0 xs:grid-cols-[9rem_1fr]">
              <span className="pt-0.5 text-[.9375rem] font-semibold tabular-nums text-muted">{item.period}</span>
              <div>
                <h3 className="mb-1 text-[1.0625rem] font-semibold">{item.title}</h3>
                <p className="text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section-top grid gap-x-12 gap-y-6 md:grid-cols-[minmax(10rem,1fr)_3fr]" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title" className={sectionTitle}>Elsewhere</h2>
        <ul className="grid gap-2.5">
          <li><a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          {publicLinks.map(link => <li key={link.url}><a className="text-link" href={link.url} rel="me noopener">{link.label}</a></li>)}
          <li><SiteLink href="/contact/" className="text-link">Project enquiries</SiteLink></li>
        </ul>
      </section>
    </>
  );
}

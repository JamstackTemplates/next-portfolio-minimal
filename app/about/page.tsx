import type { Metadata } from 'next';
import { SiteLink } from '../../components/site-link';
import { profile, publicLinks } from '../../content/profile';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${profile.name}: background, strengths and way of working.`,
  alternates: { canonical: absoluteUrl('/about/') },
};

export default function AboutPage() {
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">About</p>
        <h1 className="page-head__title">{profile.name}</h1>
        <p className="lede">{profile.role}. {profile.location}.</p>
      </header>

      <section className="wrap section section--tight split" aria-labelledby="bio-title">
        <h2 id="bio-title" className="section__title">Background</h2>
        <div className="prose">
          {profile.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="strengths-title">
        <h2 id="strengths-title" className="section__title">What I do</h2>
        <div>
          <dl className="definition-grid">
            {profile.strengths.map(item => (
              <div key={item.title}><dt>{item.title}</dt><dd>{item.detail}</dd></div>
            ))}
          </dl>
          <h3 className="subhead">Tools and skills</h3>
          <ul className="tag-list">{profile.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="approach-title">
        <h2 id="approach-title" className="section__title">How I work</h2>
        <ol className="steps">
          {profile.approach.map(step => (
            <li key={step.title}><h3>{step.title}</h3><p>{step.detail}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section split" aria-labelledby="experience-title">
        <h2 id="experience-title" className="section__title">Experience</h2>
        <ul className="timeline">
          {profile.experience.map(item => (
            <li key={item.period + item.title}>
              <span className="meta">{item.period}</span>
              <div><h3>{item.title}</h3><p>{item.detail}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section split" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title" className="section__title">Elsewhere</h2>
        <ul className="link-list">
          <li><a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          {publicLinks.map(link => <li key={link.url}><a className="text-link" href={link.url} rel="me noopener">{link.label}</a></li>)}
          <li><SiteLink href="/contact/" className="text-link">Project enquiries</SiteLink></li>
        </ul>
      </section>
    </>
  );
}

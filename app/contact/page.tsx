import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { profile, publicLinks } from '../../content/profile';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} about a project.`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Contact</p>
        <h1 className="page-head__title">Tell me about your project</h1>
        <p className="lede">
          I’m happy to hear about new projects, collaborations and questions about my work.
          A few sentences is plenty to start with — I reply to every enquiry personally.
        </p>
      </header>

      <div className="wrap section section--tight contact">
        <section className="contact__form" aria-label="Enquiry form">
          {hosted ? (
            <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={profile.email} />
          ) : (
            <div className="contact-card">
              <h2 className="contact-card__title">Write to me directly</h2>
              <p>
                Email is the best way to reach me. Send a short note about your project and I’ll reply with
                a few questions or a time to talk.
              </p>
              <p><a className="button" href={`mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry')}`}>Email {profile.name.split(' ')[0]}</a></p>
            </div>
          )}
        </section>

        <aside className="contact__aside" aria-labelledby="direct-title">
          {profile.availability ? (
            <p className="availability"><span className="availability__dot" aria-hidden="true" />{profile.availability}</p>
          ) : null}
          <h2 id="direct-title" className="subhead">Email</h2>
          <p className="contact__email">
            <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="contact__copy"><CopyEmail email={profile.email} /></p>

          {publicLinks.length ? (
            <>
              <h2 className="subhead">Elsewhere</h2>
              <ul className="link-list">
                {publicLinks.map(link => <li key={link.url}><a className="text-link" href={link.url} rel="me noopener">{link.label}</a></li>)}
              </ul>
            </>
          ) : null}

          <h2 className="subhead">Useful to include</h2>
          <ul className="checklist">
            <li>What you’re making and who it’s for</li>
            <li>Where things are now — idea, prototype or live product</li>
            <li>Your ideal timeline and any fixed dates</li>
          </ul>
        </aside>
      </div>
    </>
  );
}

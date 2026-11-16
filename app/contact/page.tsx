import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { profile, publicLinks } from '../../content/profile';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} about a project.`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

const subhead = 'mb-3 font-mono text-[.8125rem] font-normal tracking-[.02em] text-muted';

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <PageHead eyebrow="Contact" title="Tell me about your project">
        <p>
          I’m happy to hear about new projects, collaborations and questions about my work.
          A few sentences is plenty to start with — I reply to every enquiry personally.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-12 pt-[clamp(2.5rem,5vw,3.5rem)] md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <section className="print:hidden" aria-label="Enquiry form">
          {hosted ? (
            <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={profile.email} />
          ) : (
            <div className="rounded-ui border border-line bg-surface p-[clamp(1.75rem,4vw,2.75rem)]">
              <h2 className="mb-4 font-serif text-[clamp(1.6rem,3vw,2rem)]">Write to me directly</h2>
              <p className="max-w-[34rem] text-muted">
                Email is the best way to reach me. Send a short note about your project and I’ll reply with
                a few questions or a time to talk.
              </p>
              <p className="mt-6"><a className="button" href={`mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry')}`}>Email {profile.name.split(' ')[0]}</a></p>
            </div>
          )}
        </section>

        <aside className="pt-1" aria-labelledby="direct-title">
          {profile.availability ? (
            <p className="mb-8 flex items-baseline gap-2.5 rounded-ui border border-line bg-surface px-4 py-3 text-[.9375rem]">
              <span className="availability-dot size-[.55rem] flex-none -translate-y-px rounded-full bg-success" aria-hidden="true" />{profile.availability}
            </p>
          ) : null}
          <h2 id="direct-title" className={subhead}>Email</h2>
          <p className="font-serif text-[1.35rem] wrap-anywhere">
            <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="mt-3.5 flex min-h-px flex-wrap items-center gap-x-4 gap-y-2"><CopyEmail email={profile.email} /></p>

          {publicLinks.length ? (
            <>
              <h2 className={`mt-8 ${subhead}`}>Elsewhere</h2>
              <ul className="grid gap-2.5">
                {publicLinks.map(link => <li key={link.url}><a className="text-link" href={link.url} rel="me noopener">{link.label}</a></li>)}
              </ul>
            </>
          ) : null}

          <h2 className={`mt-8 ${subhead}`}>Useful to include</h2>
          <ul className="grid gap-2 text-[.9875rem] text-muted">
            {['What you’re making and who it’s for', 'Where things are now — idea, prototype or live product', 'Your ideal timeline and any fixed dates'].map(tip => (
              <li key={tip} className="relative pl-5 before:absolute before:left-0 before:text-accent before:content-['–']">{tip}</li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

import { profile, publicLinks } from '../content/profile';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-(--space-section) border-t border-line print:hidden">
      <div className="wrap grid items-start gap-x-8 gap-y-6 pt-10 pb-12 text-[.9375rem] text-muted md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-1.5 font-serif text-xl text-ink">{profile.name}</p>
          <p>{profile.role}</p>
          <p className="mt-3 text-ink">
            <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true"> · </span>
            <SiteLink href="/contact/" className="text-link">Project enquiries</SiteLink>
          </p>
        </div>
        <ul className="flex flex-wrap gap-5 empty:hidden">
          {publicLinks.map(link => (
            <li key={link.url}><a className="hover:text-accent" href={link.url} rel="me noopener">{link.label}</a></li>
          ))}
        </ul>
        <p className="col-span-full flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-[.8125rem]">
          <span>© {year} {profile.name}</span>
          <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="no-underline hover:text-footer-accent hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
        </p>
      </div>
    </footer>
  );
}

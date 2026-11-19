import { profile, publicLinks } from '../content/profile';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-(--space-section) print:hidden">
      <div className="wrap">
        <div className="grid items-end gap-x-8 gap-y-8 border-t-2 border-ink pt-10 pb-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-2 text-[.9375rem] text-muted">Write to me</p>
            <p className="text-[clamp(1.4rem,3.4vw,2.4rem)] font-bold tracking-[-.03em] wrap-anywhere">
              <a className="no-underline decoration-accent decoration-2 underline-offset-[.15em] hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <li><SiteLink href="/contact/" className="text-link">Project enquiries</SiteLink></li>
            {publicLinks.map(link => (
              <li key={link.url}><a className="text-link" href={link.url} rel="me noopener">{link.label}</a></li>
            ))}
          </ul>
        </div>
        <p className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[.875rem] text-muted">
          <span>© {year} {profile.name}, {profile.role.charAt(0).toLowerCase() + profile.role.slice(1)}</span>
          <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="no-underline hover:text-accent hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
        </p>
      </div>
    </footer>
  );
}

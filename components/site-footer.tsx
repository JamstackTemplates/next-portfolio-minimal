import { profile, publicLinks } from '../content/profile';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div>
          <p className="site-footer__lead">{profile.name}</p>
          <p>{profile.role}</p>
          <p className="site-footer__contact">
            <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
            <span aria-hidden="true"> · </span>
            <SiteLink href="/contact/" className="text-link">Project enquiries</SiteLink>
          </p>
        </div>
        <ul className="site-footer__links">
          {publicLinks.map(link => (
            <li key={link.url}><a href={link.url} rel="me noopener">{link.label}</a></li>
          ))}
        </ul>
        <p className="site-footer__meta">© {year} {profile.name}</p>
      </div>
    </footer>
  );
}

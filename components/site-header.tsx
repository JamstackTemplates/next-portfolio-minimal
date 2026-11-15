import { profile } from '../content/profile';
import { SiteLink } from './site-link';

const navigation = [
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <SiteLink href="/" className="site-header__name">
          {profile.name}
        </SiteLink>
        <nav aria-label="Main">
          <ul className="site-nav">
            {navigation.map(item => (
              <li key={item.href}>
                <SiteLink href={item.href} markCurrent="section">{item.label}</SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

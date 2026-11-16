import { DarkModeToggle } from 'jamstacks';
import { profile } from '../content/profile';
import { SiteLink } from './site-link';

const navigation = [
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 xs:py-7">
        <SiteLink href="/" className="py-1.5 font-serif text-xl no-underline after:text-accent after:content-['.']">
          {profile.name}
        </SiteLink>
        <div className="ml-auto flex items-center gap-6 print:hidden">
          <nav aria-label="Main">
            <ul className="flex gap-x-5 gap-y-1 xs:gap-x-7">
              {navigation.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="section"
                    className="inline-block border-b-2 border-transparent py-2 text-muted no-underline transition-colors hover:text-accent aria-[current]:border-accent aria-[current]:text-ink">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

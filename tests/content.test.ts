// Content and routing invariants. Runs with Node's built-in TypeScript type stripping.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { profile, publicLinks } from '../content/profile.ts';
import { getNextProject, getProject, projects, type ProjectImage } from '../content/projects.ts';

const publicFile = (path: string) => new URL(`../public${path}`, import.meta.url);

test('projects have unique, URL-safe slugs', () => {
  assert.ok(projects.length >= 1, 'Add at least one project.');
  const slugs = projects.map(project => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('every case study has the required sections', () => {
  for (const project of projects) {
    for (const key of ['title', 'summary', 'client', 'year', 'discipline', 'role', 'overview'] as const) {
      assert.ok(project[key].trim(), `${project.slug}.${key}`);
    }
    assert.ok(project.sections.length >= 1, project.slug);
    assert.ok(project.lessons.length >= 1, project.slug);
  }
});

test('every project image exists locally, has dimensions and alt text', () => {
  const images: ProjectImage[] = projects.flatMap(project => [project.cover, ...project.sections.flatMap(section => section.image ? [section.image] : [])]);
  for (const image of images) {
    assert.match(image.src, /^\/images\//, image.src);
    assert.ok(existsSync(publicFile(image.src)), `missing ${image.src}`);
    assert.ok(image.width > 0 && image.height > 0, image.src);
    assert.ok(image.alt.trim(), `alt text for ${image.src}`);
  }
  assert.ok(existsSync(publicFile('/og.png')));
});

test('next-project links cycle through every project', () => {
  if (projects.length === 1) {
    assert.equal(getNextProject(projects[0].slug), undefined);
    return;
  }
  const seen = new Set<string>();
  let current = projects[0];
  for (let i = 0; i < projects.length; i++) {
    seen.add(current.slug);
    current = getNextProject(current.slug)!;
  }
  assert.equal(seen.size, projects.length);
  assert.equal(current.slug, projects[0].slug);
  assert.equal(getProject('does-not-exist'), undefined);
});

test('no dead links ship: external links are absolute https and empty profile links are hidden', () => {
  for (const link of [...publicLinks, ...projects.flatMap(project => project.links)]) {
    assert.match(link.url, /^https:\/\//, link.url);
  }
  assert.ok(publicLinks.every(link => link.url.trim()));
  assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

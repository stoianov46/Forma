import { SITE_URL, SITE_LEGAL_NAME, CONTACT, SAME_AS } from './site';
import type { Locale } from './i18n';
import type { FaqItem } from './types';

export function organizationSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_LEGAL_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/og-default.jpg`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      ...(CONTACT.addressLine1 && { streetAddress: [CONTACT.addressLine1, CONTACT.addressLine2].filter(Boolean).join(', ') }),
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      ...(CONTACT.postalCode && { postalCode: CONTACT.postalCode }),
      addressCountry: CONTACT.addressCountry,
    },
    areaServed: ['Koh Phangan', 'Koh Samui', 'Koh Tao', 'Bali'],
    knowsAbout: [
      'Architecture',
      'Villa Design',
      'Interior Design',
      'Construction',
      'Renovation',
      'Project Management',
      'Construction Supervision',
      'Technical Supervision',
      'Landscape Design',
      'Permits & Planning',
      'Turnkey Projects',
      'Eco Construction',
      'Concrete Construction',
    ],
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'FORMA — Architecture & Design-Build, Koh Phangan',
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function webPageSchema(url: string, name: string, description: string, locale: Locale) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; areaServed?: string[] }) {
  return {
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: opts.areaServed ?? ['Koh Phangan', 'Koh Samui', 'Koh Tao', 'Bali'],
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function imageObjectSchema(url: string, caption?: string) {
  return {
    '@type': 'ImageObject',
    url,
    ...(caption ? { caption } : {}),
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

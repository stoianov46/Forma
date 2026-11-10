import type { LegalContent } from './types';

export const legalEn: LegalContent = {
  updatedLabel: 'Last updated:',
  privacy: {
    navLabel: 'Privacy Policy',
    title: 'Privacy Policy | FORMA',
    description: 'How FORMA collects, uses and protects information submitted through this website.',
    h1: 'Privacy Policy',
    sections: [
      {
        heading: 'What we collect',
        text: 'When you submit our project enquiry form, or message us via Telegram or WhatsApp, we collect the information you provide directly: your name, contact details, project type, location, budget guidance, message content and any files or images you choose to share.',
      },
      {
        heading: 'How we use it',
        text: 'Information you submit is used solely to respond to your enquiry, understand your project, and — where you proceed with us — deliver the services you have engaged FORMA for. We do not sell or rent personal information to third parties.',
      },
      {
        heading: 'Where enquiries are sent',
        text: 'Project enquiries submitted through this site are forwarded to our internal Telegram intake chat via the official Telegram Bot API, and to our team\'s email where relevant. Message content is retained only as long as needed to manage your enquiry or, if you become a client, your project.',
      },
      {
        heading: 'Planning tools and enquiry source',
        text: 'If you use the planning tools on this site and choose to send the result with your enquiry, the summary you attach is sent together with your message. If you accept analytics cookies, your browser also keeps the first page you visited, the website you came from and any campaign tags in session storage until you close the browser, and these are sent with your enquiry so we know where it came from. If you decline analytics cookies, nothing is stored for this purpose. Staff may rate the priority of an enquiry from the details you provide; this is used only to decide which enquiry we answer first.',
      },
      {
        heading: 'Third-party services',
        text: 'We use Telegram and WhatsApp (Meta) as official messaging channels for project intake, an email delivery provider and, where configured, a customer-management tool to receive enquiries, and, once implemented, privacy-respecting analytics to understand site usage. Each of these providers has its own privacy practices governing their platforms.',
      },
      {
        heading: 'Your rights',
        text: 'You may request access to, correction of, or deletion of personal information you have submitted to us by contacting {email}. We will respond to verified requests within a reasonable timeframe.',
      },
      {
        heading: 'Data retention',
        text: 'Enquiry data that does not proceed to an active project is retained for a limited period ({retention}) and then deleted, unless you ask us to remove it sooner.',
      },
      {
        heading: 'Contact',
        text: 'Questions about this policy can be sent to {email}.',
      },
    ],
  },
  terms: {
    navLabel: 'Terms of Service',
    title: 'Terms of Service | FORMA',
    description: 'Terms governing use of the FORMA website and initial project enquiries.',
    h1: 'Terms of Service',
    sections: [
      {
        heading: 'About this site',
        text: 'This website is operated by FORMA, an architecture and design-build studio based on Koh Phangan, Thailand. Content on this site is provided for general information about our services and portfolio.',
      },
      {
        heading: 'No guarantee of outcome',
        text: 'Budget guidance, estimates, timelines and process descriptions on this site, including the results of the planning tools, are indicative and educational. They do not constitute a binding quotation, contract or guarantee of specific cost, schedule or regulatory approval. Formal project terms are set out in a separate signed agreement once a project is scoped.',
      },
      {
        heading: 'Permits and regulatory matters',
        text: 'FORMA coordinates permit and planning documentation on behalf of clients but does not hold government authority and cannot guarantee approval outcomes or timing, which rest with the relevant local authority.',
      },
      {
        heading: 'Intellectual property',
        text: 'Text, images and design content on this site are owned by FORMA or used under licence, and may not be copied or reproduced without permission, except for standard personal browsing use.',
      },
      {
        heading: 'Enquiries',
        text: 'Submitting our contact form or bot intake flow does not create a binding engagement. It initiates a conversation, which may lead to a separate signed project agreement.',
      },
      {
        heading: 'Governing law',
        text: '{governingLaw}.',
      },
    ],
  },
  cookies: {
    navLabel: 'Cookie Settings',
    title: 'Cookie Settings | FORMA',
    description: 'How FORMA uses cookies and similar technologies, and how to manage your preferences.',
    h1: 'Cookie Settings',
    intro:
      'We use a small number of cookies to run this site and, where you consent, to understand how it is used. You can change your preference at any time using the control below.',
    categories: [
      {
        title: 'Essential',
        body: 'Required for basic site functionality, such as remembering your language preference and your cookie choice itself. These cannot be disabled.',
      },
      {
        title: 'Analytics',
        body: 'Help us understand how visitors use the site so we can improve it, and let us tell where an enquiry came from. Not active until you consent.',
      },
      {
        title: 'Marketing',
        body: 'Used to measure the effectiveness of any future marketing campaigns. Not active until you consent, and not currently in use on this site.',
      },
    ],
    manage: 'Manage cookie preferences',
  },
  accessibility: {
    navLabel: 'Accessibility',
    title: 'Accessibility | FORMA',
    description: 'Our commitment to an accessible website and how to report an accessibility issue.',
    h1: 'Accessibility Statement',
    body: 'We aim for this website to be usable by as many people as possible, including via keyboard navigation and screen readers, with sufficient colour contrast and respect for reduced-motion preferences. If you encounter an accessibility barrier anywhere on this site, please tell us at {email} so we can address it.',
  },
  editorialPolicy: {
    navLabel: 'Editorial Policy',
    title: 'Editorial Policy | FORMA',
    description: 'How FORMA researches, writes and maintains the articles published in our Journal.',
    h1: 'Editorial Policy',
    body: 'Articles published in our Journal are written in-house by our studio team, drawing on our direct experience designing and building on Koh Phangan and the surrounding islands. We do not publish sponsored content, fabricate statistics, or present unverified claims as fact. Where an article references external standards, regulations or technical claims, we reference authoritative sources where appropriate. Articles are reviewed periodically and updated when information changes; the "last updated" date on each article reflects the most recent review.',
  },
};

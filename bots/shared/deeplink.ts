import { LOCATIONS, SERVICES, type LeadState, type LocationSlug, type ServiceSlug } from './flow';

/**
 * Parses the optional /start deep-link payload set by the website's context chat links
 * (src/components/blocks/ContactChannels.astro): "service_<slug>" or "location_<slug>".
 * Unknown kinds or slugs are ignored, so a stale or forged link can never put a value outside the lists into the flow.
 */
export function applyStartPayload(state: Pick<LeadState, 'service' | 'location'>, payload?: string): void {
  if (!payload) return;
  const [kind, ...rest] = payload.split('_');
  const value = rest.join('_');
  if (kind === 'service' && (SERVICES as readonly string[]).includes(value)) state.service = value as ServiceSlug;
  if (kind === 'location' && (LOCATIONS as readonly string[]).includes(value)) state.location = value as LocationSlug;
}

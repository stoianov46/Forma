/**
 * Schematic visual data for the concept projects. Everything here is illustrative design intent for
 * fictional studies: no verified specifications, dimensions or real sites. See CONCEPT_PORTFOLIO.md.
 */
export type Massing = 'stepped' | 'courtyard' | 'linear' | 'shoreline' | 'compound';
export type MaterialKey = 'timber' | 'stone' | 'concrete' | 'clay' | 'lime' | 'steel' | 'glass' | 'planting';

export const MATERIAL_COLORS: Record<MaterialKey, string> = {
  timber: '#8a5a33',
  stone: '#8c8a82',
  concrete: '#b9b7b0',
  clay: '#b4573a',
  lime: '#e8e2d3',
  steel: '#4b5258',
  glass: '#a8c8cf',
  planting: '#5f7f48',
};

export interface ConceptVisual {
  massing: Massing;
  /** Intended material palette, most prominent first. */
  palette: MaterialKey[];
  /** Compass bearing (degrees, 0 = up) of the main view / sea direction in the diagram. */
  viewAngle: number;
}

export const conceptVisuals: Record<string, ConceptVisual> = {
  'ridge-house-sri-thanu': { massing: 'stepped', palette: ['timber', 'stone', 'concrete', 'glass'], viewAngle: 270 },
  'bay-view-residence-chaloklum': { massing: 'courtyard', palette: ['lime', 'timber', 'clay', 'planting'], viewAngle: 0 },
  'thong-sala-townhouse-renovation': { massing: 'linear', palette: ['lime', 'concrete', 'timber', 'steel'], viewAngle: 90 },
  'haad-yao-beachfront-pavilion': { massing: 'shoreline', palette: ['timber', 'concrete', 'glass', 'stone'], viewAngle: 270 },
  'haad-salad-privacy-villa': { massing: 'courtyard', palette: ['stone', 'timber', 'planting', 'concrete'], viewAngle: 180 },
  'baan-tai-family-compound': { massing: 'compound', palette: ['clay', 'timber', 'concrete', 'planting'], viewAngle: 180 },
};

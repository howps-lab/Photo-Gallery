export interface GalleryItem {
  id: string;
  indexFormatted: string;
  title: string;
  editorialWord: string;
  category: string;
  location: string;
  year: string;
  aspect: '4:3' | '16:9' | '3:4';
  src: string;
  curatorNote: string;
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '01',
    indexFormatted: '01',
    title: 'Pavilion of Light',
    editorialWord: 'STRUCTURE',
    category: 'Minimalist Brutalism',
    location: 'Basel, Switzerland',
    year: '2026',
    aspect: '4:3',
    src: '/src/assets/images/arch_brutalist_1792498071249.jpg',
    curatorNote: 'Monolithic concrete volumes intersecting stark midday geometric shadows. An architectural meditation on void and permanence.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 38mm f/2.5 V',
      focalLength: '38mm',
      aperture: 'f/8.0',
      shutter: '1/400s',
      iso: '64',
    },
  },
  {
    id: '02',
    indexFormatted: '02',
    title: 'Silver DB5 Nocturne',
    editorialWord: 'VELOCITY',
    category: 'Automotive Silhouette',
    location: 'Mayfair, London',
    year: '2026',
    aspect: '16:9',
    src: '/src/assets/images/porsche_nocturne_1792498072581.jpg',
    curatorNote: 'Wet cobblestone reflections and sodium-vapor luminescence framing the timeless sculpted form of an iconic British grand tourer.',
    exif: {
      camera: 'Leica SL3',
      lens: 'Summilux-SL 50mm f/1.4 ASPH',
      focalLength: '50mm',
      aperture: 'f/1.8',
      shutter: '1/125s',
      iso: '800',
    },
  },
  {
    id: '03',
    indexFormatted: '03',
    title: 'Sculpted Silence',
    editorialWord: 'ELEGANCE',
    category: 'Editorial Portraiture',
    location: 'Milan, Italy',
    year: '2026',
    aspect: '3:4',
    src: '/src/assets/images/editorial_portrait_1792498072656.jpg',
    curatorNote: 'Natural window chiaroscuro cascading over minimalist tailored silhouettes. Raw texture and quiet composure captured on monochrome film.',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Noctilux-M 50mm f/1.2 ASPH',
      focalLength: '50mm',
      aperture: 'f/2.0',
      shutter: '1/250s',
      iso: '125',
    },
  },
  {
    id: '04',
    indexFormatted: '04',
    title: 'Monolithic Tide',
    editorialWord: 'HORIZON',
    category: 'Fine-Art Seascape',
    location: 'Big Sur, California',
    year: '2026',
    aspect: '16:9',
    src: '/src/assets/images/coastal_monolith_1792498073216.jpg',
    curatorNote: 'Perilous basalt sea stack resisting the violent Pacific surf at first dawn light. Atmospheric coastal haze dissolving sea into sky.',
    exif: {
      camera: 'Sony α7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '35mm',
      aperture: 'f/11',
      shutter: '1/20s',
      iso: '100',
    },
  },
  {
    id: '05',
    indexFormatted: '05',
    title: 'Terra Solis Modernism',
    editorialWord: 'SOLITUDE',
    category: 'Desert Architecture',
    location: 'Sonoran Desert, Arizona',
    year: '2026',
    aspect: '4:3',
    src: '/src/assets/images/desert_modernism_1792498073709.jpg',
    curatorNote: 'Rammed-earth pavilions harmonizing with ancient saguaro and sun-bleached desert plateaus under unyielding cobalt skies.',
    exif: {
      camera: 'Fujifilm GFX 100 II',
      lens: 'GF 32-64mm f/4 R LM WR',
      focalLength: '45mm',
      aperture: 'f/9.0',
      shutter: '1/500s',
      iso: '80',
    },
  },
  {
    id: '06',
    indexFormatted: '06',
    title: 'Neon Solitude',
    editorialWord: 'LUMINA',
    category: 'Atmospheric Street',
    location: 'Shinjuku, Tokyo',
    year: '2026',
    aspect: '3:4',
    src: '/src/assets/images/tokyo_street_rain_1792498074220.jpg',
    curatorNote: 'A solitary figure beneath a clear umbrella traversing glistening rain-drenched alleys illuminated by neon signage.',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 33mm f/1.4 R LM WR',
      focalLength: '33mm',
      aperture: 'f/1.4',
      shutter: '1/160s',
      iso: '640',
    },
  },
];

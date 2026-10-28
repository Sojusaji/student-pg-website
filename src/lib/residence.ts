export const residence = {
  rooms: 2,
  residentsPerRoom: { min: 2, max: 3 },
  attachedBathrooms: 2,
  halls: 1,
  hallSize: 'medium',
  airConditioned: false,
  biometricAccess: false,
  level: 'terrace / penthouse',
  provided: ['beds', 'pillows', 'desks'],
  // Owner-confirmed: home-cooked breakfast, lunch and dinner, billed apart from rent.
  food: {
    provided: true,
    homeCooked: true,
    meals: ['breakfast', 'lunch', 'dinner'],
    includedInRent: false,
  },
  contact: {
    // Owner's real contact number, entered exactly as provided.
    phone: '777893922944',
    whatsappNumber: '777893922944',
    // Area-level address shown publicly (same area as the map); the street address is shared on request.
    address: 'Villadam, Thrissur, Kerala',
  },
  // Owner-confirmed: the residence is a short walk from the college most residents attend.
  location: {
    area: 'Villadam, Thrissur, Kerala',
    college: {
      name: 'ELIMS College of Pharmacy',
      walkMinutes: { min: 4, max: 6 },
    },
    // Demo map marker at the college area until the owner supplies the exact residence pin.
    demoMap: { college: { lat: 10.56305, lon: 76.24206 } },
  },
} as const;

export const siteName = 'Terrace Suites';

export const whatsappInquiryMessage =
  "Hi! I'm interested in a room at Terrace Suites. Could you please share the rent, deposit and current availability?";

export function whatsappHref(message: string = whatsappInquiryMessage): string {
  return `https://wa.me/${residence.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${residence.contact.phone}`;
}

export function walkingDirectionsHref(): string {
  const destination = encodeURIComponent(`${residence.location.college.name}, Villadam, Thrissur, Kerala 680631`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`;
}

export function copyrightNotice(year: number): string {
  return `© ${year} ${siteName}. All rights reserved.`;
}

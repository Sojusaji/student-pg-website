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
    phone: '9633267195',
    whatsappNumber: '919633267195',
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

export const siteName = 'TERRACE SUITES';

export const whatsappInquiryMessage =
  "Hi! I'm interested in a room at Terrace Suites. Could you please share the rent, deposit and current availability?";

export function whatsappHref(message: string = whatsappInquiryMessage): string {
  const cleanPhone = residence.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${residence.contact.phone}`;
}

export function walkingDirectionsHref(): string {
  const collegeAddress = encodeURIComponent(`${residence.location.college.name}, Villadam, Thrissur, Kerala 680631`);
  const homeAddress= encodeURIComponent("10.562626970548978, 76.24355904905198");
  
  return `https://www.google.com/maps/dir/?api=1&origin=${homeAddress}&destination=${collegeAddress}&travelmode=walking`;
}

export function copyrightNotice(year: number): string {
  return `© ${year} ${siteName}. All rights reserved.`;
}

import { describe, expect, it } from 'vitest';
import { copyrightNotice, residence, telHref, whatsappHref, whatsappInquiryMessage } from '@/lib/residence';

describe('Confirmed residence facilities', () => {
  it('has two rooms', () => expect(residence.rooms).toBe(2));
  it('accommodates two to three residents per room', () => expect(residence.residentsPerRoom).toEqual({ min: 2, max: 3 }));
  it('has two attached bathrooms', () => expect(residence.attachedBathrooms).toBe(2));
  it('has one medium-sized hall', () => { expect(residence.halls).toBe(1); expect(residence.hallSize).toBe('medium'); });
  it('is non-AC', () => expect(residence.airConditioned).toBe(false));
  it('does not have biometric access', () => expect(residence.biometricAccess).toBe(false));
  it('is on the terrace / penthouse level', () => expect(residence.level).toBe('terrace / penthouse'));
  it('provides beds, pillows and desks', () => expect(residence.provided).toEqual(['beds', 'pillows', 'desks']));
});

describe('WhatsApp contact', () => {
  it('uses a digits-only WhatsApp number with country code', () => expect(residence.contact.whatsappNumber).toMatch(/^\d{10,15}$/));
  it('opens WhatsApp with the prefilled inquiry message', () => {
    expect(whatsappHref()).toBe(
      `https://wa.me/${residence.contact.whatsappNumber}?text=${encodeURIComponent(whatsappInquiryMessage)}`,
    );
  });
  it('keeps the sample message editable by encoding it, not locking it into a template', () => {
    expect(whatsappHref('My own question')).toBe(`https://wa.me/${residence.contact.whatsappNumber}?text=My%20own%20question`);
  });
});

describe('Footer contact and copyright', () => {
  it('shows the phone number the owner supplied', () => expect(residence.contact.phone).toBe('777893922944'));
  it('makes the footer phone tappable', () => expect(telHref()).toBe('tel:777893922944'));
  it('uses the same number for WhatsApp and phone', () => expect(residence.contact.whatsappNumber).toBe(residence.contact.phone));
  it('shows the copyright with the site name', () => expect(copyrightNotice(2026)).toBe('© 2026 Terrace Suites. All rights reserved.'));
  it('carries the same wording into the next year', () => expect(copyrightNotice(2027)).toBe('© 2027 Terrace Suites. All rights reserved.'));
  it('never hardcodes a year into the notice text', () => expect(copyrightNotice(2031)).toBe('© 2031 Terrace Suites. All rights reserved.'));
  it('has no address yet, so the footer falls back to a message-me line', () => expect(residence.contact.address).toBe(''));
});

describe('Food provided', () => {
  it('provides food', () => expect(residence.food.provided).toBe(true));
  it('serves home-cooked meals', () => expect(residence.food.homeCooked).toBe(true));
  it('serves breakfast, lunch and dinner', () => expect(residence.food.meals).toEqual(['breakfast', 'lunch', 'dinner']));
  it('charges food separately from rent', () => expect(residence.food.includedInRent).toBe(false));
});

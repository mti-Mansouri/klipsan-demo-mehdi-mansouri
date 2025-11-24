export type Location = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
  mapEmbedUrl: string; // Embed URL for Google Maps
};

export const locations: Location[] = [
  {
    name: "BROOKLYN",
    addressLine1: "12834 Fitness Ln.",
    addressLine2: "Brooklyn, NY 11385",
    email: "brooklyn@example.com",
    phone: "(555)-555-5555",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40wNDInNDYuMiJOIDczwrA1Nic1NC41Ilc!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    name: "LOS ANGELES",
    addressLine1: "8432 Sunset Blvd.",
    addressLine2: "Los Angeles, CA 90069",
    email: "la@example.com",
    phone: "(555)-555-1234",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5!2d-118.3!3d34.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzQ4LjUiTiAxMTjCsDIyJzM0LjMiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
];
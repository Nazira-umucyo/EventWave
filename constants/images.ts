/**
 * Central image manifest.
 *
 * Every image the app uses is required exactly once, here. To replace a
 * placeholder with the real Figma export: keep the same filename in
 * assets/images/ and just overwrite the file — no code changes needed
 * anywhere else in the app.
 *
 * Naming follows assets/images/image1.png, image2.png, ... as requested.
 */

export const Images = {
  // Branding
  logoMark: require("@/assets/images/image1.png"),

  // Onboarding
  onboarding1: require("@/assets/images/image2.png"),
  onboarding2: require("@/assets/images/image3.png"),
  onboarding3: require("@/assets/images/image4.png"),

  // Event hero / backdrop imagesassets/images/image5 (2).jpg
  eventHeroBandConcert: require("@/assets/images/image5 (2).jpg"),
  eventHeroShereBangla: require("@/assets/images/baskballfinal.jpg"),

  // Event thumbnails
  eventDesignersMeetup: require("@/assets/images/designersMeetup (1).jpg"),
  eventDribbblersMeetup: require("@/assets/images/image5 (2).jpg"),
  eventFoodCompetition: require("@/assets/images/foodcompetitionevent.jpg"),
  eventBasketballFinal: require("@/assets/images/baskballfinal.jpg"),
  eventArbStuntRiders: require("@/assets/images/africanStudentDay.jpg"),
  eventInternationalMusicCo: require("@/assets/images/rwandaMusic.jpg"),
  eventFootballFinal: require("@/assets/images/footballmatch.jpg"),

  // Avatars
  avatarCurrentUser: require("@/assets/images/image14.png"), // MD Rafi Islam assets/images/
  avatarAlexLee: require("@/assets/images/image15.png"),
  avatarMichealUllasi: require("@/assets/images/image16.png"),
  avatarDavidSilbia: require("@/assets/images/image17.png"),
  avatarAshfakSayem: require("@/assets/images/image18.png"),
  avatarRocksVelkeinjen: require("@/assets/images/image19.png"),
  avatarRomanKutepov: require("@/assets/images/image20.png"),
  avatarCristoferNolan: require("@/assets/images/image21.png"),
  avatarJhonWick: require("@/assets/images/image22.png"),
  avatarZeniferoBolex: require("@/assets/images/image23.png"),
  avatarOrganizerTamim: require("@/assets/images/image24.png"), // Organizer profile

  // Map background (no map SDK is in package.json, so this is a static
  // stylized "map" background with pins positioned on top — see
  // components/MapPlaceholder.tsx). Swap this file for a real static map
  // export, or swap the component for react-native-maps later.
  mapBackground: require("@/assets/images/image25.png"),
};

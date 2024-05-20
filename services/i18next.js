import i18next, {init} from 'i18next';
import {Translation, initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import ud from '../locales/ud.json';
import pb from '../locales/pb.json';
import tm from '../locales/tm.json';
import tg from '../locales/tg.json';
import bg from '../locales/bg.json';
import ml from '../locales/ml.json';
import kn from '../locales/kn.json';
import gj from '../locales/gj.json';
import od from '../locales/od.json';
import mt from '../locales/mt.json';
import as from '../locales/as.json';

export const languageResources = {
  English: {translation: en},
  हिंदी: {translation: hi},
  اردو: {translation: ud},
  ਪੰਜਾਬੀ: {translation: pb},
  தமிழ்: {translation: tm},
  తెలుగు: {translation: tg},
  বাংলা: {translation: bg},
  മലയാളം: {translation: ml},
  ಕನ್ನಡ: {translation: kn},
  ગુજરાતી: {translation: gj},
  ଓଡ଼ିଆ: {translation: od},
  मराठी: {translation: mt},
  অসমীয়া: {translation: as},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbacklng: 'en',
  resources: languageResources,
});

export default i18next;

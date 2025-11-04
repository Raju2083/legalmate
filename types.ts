export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}

export const LANGUAGES: Record<string, string> = {
  en: 'English',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  hi: 'हिन्दी (Hindi)',
  mr: 'मराठी (Marathi)',
  ml: 'മലയാളം (Malayalam)',
  kn: 'ಕನ್ನಡ (Kannada)',
};
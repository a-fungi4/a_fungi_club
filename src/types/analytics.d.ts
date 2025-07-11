// Type definitions for Google Analytics and Meta Pixel on the window object

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {}; 
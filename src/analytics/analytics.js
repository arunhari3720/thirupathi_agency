
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export const initAnalytics = () => {
  if (!GA_MEASUREMENT_ID || initialized) return;

  // Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  document.head.appendChild(script);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  initialized = true;
};

// Track page views
export const trackPageView = (pagePath) => {
  if (!initialized || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: document.title,
    page_location: window.location.origin + pagePath,
  });
};

// Track custom events
export const trackEvent = (eventName, params = {}) => {
  if (!initialized || !window.gtag) return;

  window.gtag("event", eventName, params);
};

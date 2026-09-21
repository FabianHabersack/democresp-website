(() => {
  // Keep local previews and copies of the site out of the project statistics.
  const isPublicSite = ['democresp.eu', 'www.democresp.eu'].includes(window.location.hostname);
  const privacyRequested = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  if (!isPublicSite || privacyRequested) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://fabianhabersack.goatcounter.com/count';
  document.head.append(script);
})();

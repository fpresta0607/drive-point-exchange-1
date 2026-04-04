'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { getConsent } from '@/lib/consent';
import { getTrackedPageContext, pushDataLayerEvent } from '@/lib/gtm';

const GTM_CONTAINER_ID = 'GTM-5J37J72S';
const CONSENT_DEFAULT_WAIT_MS = 500;
const EEA_UK_CH_REGION_CODES = [
  'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR',
  'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT',
  'RO', 'SE', 'SI', 'SK',
];

type GtagConsentState = 'granted' | 'denied';

interface GtagConsentParameters {
  analytics_storage: GtagConsentState;
  ad_storage: GtagConsentState;
  ad_user_data: GtagConsentState;
  ad_personalization: GtagConsentState;
  region?: string[];
  wait_for_update?: number;
}

type GtagFunction = (
  command: 'consent',
  action: 'default' | 'update',
  parameters: GtagConsentParameters,
) => void;

function pushPageViewEvent(pathname: string, lastTrackedPathRef: { current: string | null }): void {
  if (typeof window === 'undefined' || !pathname) {
    return;
  }

  const { pagePath, pageLocation } = getTrackedPageContext();

  if (lastTrackedPathRef.current === pagePath) {
    return;
  }

  lastTrackedPathRef.current = pagePath;

  pushDataLayerEvent({
    event: 'page_view',
    page_path: pagePath,
    page_title: document.title,
    page_location: pageLocation,
    language: document.documentElement.lang || 'en-US',
  });
}

function getConsentMode(functional: boolean, marketing: boolean): GtagConsentParameters {
  const analyticsState: GtagConsentState = functional ? 'granted' : 'denied';
  const adState: GtagConsentState = marketing ? 'granted' : 'denied';

  return {
    analytics_storage: analyticsState,
    ad_storage: adState,
    ad_user_data: adState,
    ad_personalization: adState,
  };
}

function updateGoogleConsent(functional: boolean, marketing: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  const gtag = (window as Window & { gtag?: GtagFunction }).gtag;
  if (!gtag) {
    return;
  }

  gtag('consent', 'update', getConsentMode(functional, marketing));
}

export function ConsentScripts() {
  const [hasSavedConsent, setHasSavedConsent] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const update = () => {
      const consent = getConsent();

      if (consent) {
        setHasSavedConsent(true);
        setFunctional(consent.functional);
        setMarketing(consent.marketing);
      } else {
        setHasSavedConsent(false);
        setFunctional(false);
        setMarketing(false);
      }
    };

    update();
    window.addEventListener('consent-updated', update);
    return () => window.removeEventListener('consent-updated', update);
  }, [pathname]);

  useEffect(() => {
    if (!hasSavedConsent) {
      return;
    }

    updateGoogleConsent(functional, marketing);
  }, [functional, hasSavedConsent, marketing]);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    pushPageViewEvent(pathname, lastTrackedPathRef);
  }, [pathname]);

  return (
    <>
      <Script
        id="trustpilot-bootstrap"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
      />

      <Script id="gtm-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            region: ${JSON.stringify(EEA_UK_CH_REGION_CODES)},
            wait_for_update: ${CONSENT_DEFAULT_WAIT_MS}
          });
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: ${CONSENT_DEFAULT_WAIT_MS}
          });
        `}
      </Script>

      <Script id="gtm-container" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
        `}
      </Script>

      {functional && (
        <>
          <Script
            id="instagram-embed"
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
          />
          <Script
            id="facebook-sdk"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0"
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
}

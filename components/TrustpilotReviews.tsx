'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force: boolean) => void;
    };
  }
}

export default function TrustpilotReviews() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let loadAttempted = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tryLoad = () => {
      if (loadAttempted) return false;
      if (window.Trustpilot) {
        loadAttempted = true;
        try {
          if (widgetRef.current) window.Trustpilot.loadFromElement(widgetRef.current, true);
        } catch (err) {
          console.error('[TrustPilot] Widget load error:', err);
        }
        return true;
      }
      return false;
    };

    let delay = 300;
    const maxRetries = 10;
    let retries = 0;

    const scheduleRetry = () => {
      if (retries >= maxRetries) {
        setShowFallback(true);
        return;
      }
      const timer = setTimeout(() => {
        if (!tryLoad()) {
          retries++;
          delay = Math.round(delay * 1.5);
          scheduleRetry();
        }
      }, delay);
      timers.push(timer);
    };

    scheduleRetry();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="5406e65db0d04a09e042d5fc"
        data-businessunit-id="69ba16dc64b632407461914d"
        data-style-height="88px"
        data-style-width="100%"
        data-token={process.env.NEXT_PUBLIC_TRUSTPILOT_TOKEN}
        data-review-disclaimer="true"
      >
        <a href="https://www.trustpilot.com/review/drivepointexchange.com" target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>

      {showFallback && (
        <div className="text-center mt-8">
          <a
            href="https://www.trustpilot.com/review/drivepointexchange.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dpe-blue hover:text-dpe-navy font-medium"
          >
            Read our verified reviews on Trustpilot →
          </a>
        </div>
      )}
    </>
  );
}

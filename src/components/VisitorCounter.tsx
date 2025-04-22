"use client";

import { useEffect, useRef } from 'react';

export default function VisitorCounter() {
  // Use ref to track if the counter has been initialized
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization during development or page transitions
    if (isInitialized.current) return;
    isInitialized.current = true;
    // Create the counter container div with enhanced hiding
    const counterDiv = document.createElement('div');
    counterDiv.id = 'sfcfc41cf785gyjk3djr3tkg8h99jeu28b5';

    // Apply multiple hiding techniques
    counterDiv.style.visibility = 'hidden';
    counterDiv.style.display = 'none';
    counterDiv.style.position = 'absolute';
    counterDiv.style.left = '-9999px';
    counterDiv.style.width = '0';
    counterDiv.style.height = '0';
    counterDiv.style.overflow = 'hidden';
    counterDiv.setAttribute('aria-hidden', 'true');
    counterDiv.setAttribute('tabindex', '-1');

    // Add to a hidden container instead of directly to body
    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.display = 'none';
    hiddenContainer.appendChild(counterDiv);
    document.body.appendChild(hiddenContainer);

    // Add the counter script
    const counterScript = document.createElement('script');
    counterScript.type = 'text/javascript';
    counterScript.src = 'https://counter2.optistats.ovh/private/counter.js?c=fc41cf785gyjk3djr3tkg8h99jeu28b5&down=async';
    counterScript.async = true;
    document.body.appendChild(counterScript);

    // Add fallback for noscript
    const noscriptElement = document.createElement('noscript');
    noscriptElement.innerHTML = '<a href="https://www.freecounterstat.com" title="free website counter"><img src="https://counter2.optistats.ovh/private/freecounterstat.php?c=fc41cf785gyjk3djr3tkg8h99jeu28b5" border="0" title="free website counter" alt="free website counter"></a>';
    counterDiv.appendChild(noscriptElement);

    // Add CSS to ensure counter stays hidden
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #sfcfc41cf785gyjk3djr3tkg8h99jeu28b5,
      #sfcfc41cf785gyjk3djr3tkg8h99jeu28b5 * {
        visibility: hidden !important;
        display: none !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      // Cleanup on unmount
      try {
        document.body.removeChild(hiddenContainer);
        document.body.removeChild(counterScript);
        document.head.removeChild(styleElement);
      } catch (e) {
        // Ignore errors if elements were already removed
      }
    };
  }, []);

  // Return null since we're creating the counter directly in the DOM
  return null;
}
"use client";

import { useEffect } from 'react';

export default function VisitorCounter() {
  useEffect(() => {
    // Create the counter container div
    const counterDiv = document.createElement('div');
    counterDiv.id = 'sfcfc41cf785gyjk3djr3tkg8h99jeu28b5';
    counterDiv.style.visibility = 'hidden'; // Make it hidden
    counterDiv.style.position = 'absolute';
    counterDiv.style.left = '-9999px';
    document.body.appendChild(counterDiv);

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

    return () => {
      // Cleanup on unmount
      try {
        document.body.removeChild(counterDiv);
        document.body.removeChild(counterScript);
      } catch (e) {
        // Ignore errors if elements were already removed
      }
    };
  }, []);

  // Return null since we're creating the counter directly in the DOM
  return null;
}
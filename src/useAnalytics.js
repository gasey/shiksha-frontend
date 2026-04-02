import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {   // ✅ safety check
      window.gtag('config', 'G-EQWR3BD3C7', {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
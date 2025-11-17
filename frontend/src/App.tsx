import { useEffect } from "react";
import { SEO_CONFIG } from "@/config/seo";
import AppRouter from "@/routes";

const App = () => {
  useEffect(() => {
    document.title = SEO_CONFIG.title;

    const setMetaByName = (name: string, content: string) => {
      const element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute("content", content);
      }
    };

    const setMetaByProperty = (property: string, content: string) => {
      const element = document.querySelector(`meta[property="${property}"]`);
      if (element) {
        element.setAttribute("content", content);
      }
    };

    setMetaByName("description", SEO_CONFIG.description);
    setMetaByName("keywords", SEO_CONFIG.keywords.join(", "));
    setMetaByProperty("og:title", SEO_CONFIG.title);
    setMetaByProperty("og:description", SEO_CONFIG.description);
    setMetaByProperty("og:site_name", SEO_CONFIG.siteName);
    setMetaByName("twitter:title", SEO_CONFIG.title);
    setMetaByName("twitter:description", SEO_CONFIG.description);
  }, []);

  return <AppRouter />;
};

export default App;

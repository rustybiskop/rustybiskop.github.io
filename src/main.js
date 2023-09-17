import serviceWorker from "./workers/serviceWorker/installServiceWorker.js";
import nav from "./components/navigation/nav.js";
import pwaInstallPrompt from "./components/prompts/pwaInstallPrompt.js";
import Home from "./components/pages/home.js";
import annoye from "./utils/annoying.js";

nav();

const installButton = document.querySelector("#install");

pwaInstallPrompt(installButton);

/**
 * @description remove install button once web app is installed
 */
if (window.matchMedia(" (display-mode: standalone)").matches) {
  // PWA is installed

  if (installButton) installButton.remove();
}
Home();
serviceWorker();
// annoye();

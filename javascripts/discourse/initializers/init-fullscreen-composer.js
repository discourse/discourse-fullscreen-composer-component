import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  const composer = api.container.lookup("service:composer");
  const site = api.container.lookup("service:site");
  if (site.desktopView) {
    api.onAppEvent("composer:will-open", () => {
      if (settings.full_height_not_fullscreen) {
        return document.documentElement.style.setProperty(
          "--composer-height",
          "100vh"
        );
      }

      if (
        ((composer.model.draftKey === "new_topic" &&
          settings.fullscreen_for_new_topics) ||
          composer.model.draftKey !== "new_topic") &&
        !settings.full_height_not_fullscreen
      ) {
        composer.fullscreenComposer();
      }
    });
  }
});

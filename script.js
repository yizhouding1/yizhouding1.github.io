(() => {
  const routes = ["profile", "research", "campus", "recognition"];
  const panels = new Map(
    [...document.querySelectorAll("[data-panel]")].map((panel) => [panel.dataset.panel, panel])
  );
  const routeControls = [...document.querySelectorAll("[data-route]")];
  const navButtons = [...document.querySelectorAll(".primary-nav [data-route]")];

  function normalizeRoute(value) {
    return routes.includes(value) ? value : "profile";
  }

  function showRoute(route, { updateHash = true, focusPanel = false } = {}) {
    const nextRoute = normalizeRoute(route);

    panels.forEach((panel, panelRoute) => {
      const isActive = panelRoute === nextRoute;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
      if (isActive) {
        panel.classList.remove("is-entering");
        window.requestAnimationFrame(() => panel.classList.add("is-entering"));
      }
    });

    navButtons.forEach((control) => {
      const isActive = control.dataset.route === nextRoute;
      control.classList.toggle("is-active", isActive);
      control.setAttribute("aria-selected", String(isActive));
    });

    if (updateHash && window.location.hash !== `#${nextRoute}`) {
      history.pushState({ route: nextRoute }, "", `#${nextRoute}`);
    }

    window.scrollTo({ top: 0, behavior: "auto" });

    if (focusPanel) {
      const heading = panels.get(nextRoute)?.querySelector("h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
  }

  routeControls.forEach((control) => {
    control.addEventListener("click", (event) => {
      const route = control.dataset.route;
      if (!route) return;
      event.preventDefault();
      showRoute(route, { updateHash: true, focusPanel: control.tagName === "BUTTON" });
    });
  });

  window.addEventListener("popstate", () => {
    showRoute(window.location.hash.slice(1), { updateHash: false });
  });

  window.addEventListener("hashchange", () => {
    showRoute(window.location.hash.slice(1), { updateHash: false });
  });

  showRoute(window.location.hash.slice(1), { updateHash: false });
})();

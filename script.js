const panelNames = ["about", "research", "experience", "recognition"];
const tabButtons = [...document.querySelectorAll('[role="tab"][data-panel]')];
const panelButtons = [...document.querySelectorAll('button[data-panel]')];

function showPanel(name, updateHistory = true) {
  const target = panelNames.includes(name) ? name : "about";

  document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
    panel.hidden = panel.id !== `panel-${target}`;
  });

  tabButtons.forEach((button) => {
    const active = button.dataset.panel === target;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  if (updateHistory) history.pushState(null, "", `#${target}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

panelButtons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panel));
});

window.addEventListener("hashchange", () => showPanel(location.hash.slice(1), false));
showPanel(location.hash.slice(1), false);

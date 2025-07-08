document.addEventListener("DOMContentLoaded", () => {
  const VERTICAL_SECTION = ".form-tabs-vertical";
  const TAB_ID = ".f-tab";

  switchTab(VERTICAL_SECTION + " " + TAB_ID);
});

function switchTab(tabBtnId) {
  const ACTIVED = "is-active";
  const PANEL_CLASS = ".work-log-panel";

  const tabButtons = document.querySelectorAll(tabBtnId);
  const contentPanels = document.querySelectorAll(PANEL_CLASS);

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove(ACTIVED);
      });
      button.classList.add(ACTIVED);

      const targetId = button.dataset.target;
      const targetPanel = document.querySelector(targetId);

      contentPanels.forEach((panel) => panel.classList.remove(ACTIVED));
      if (targetPanel) {
        targetPanel.classList.add(ACTIVED);
      }
    });
  });
}

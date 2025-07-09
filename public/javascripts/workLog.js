document.addEventListener("DOMContentLoaded", () => {
  switchTab(".form-tabs-vertical .f-tab");
  showPopup();
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

function showPopup() {
  const BTN_ID = "#form-btn";
  const POPUP_CLASS = ".form-popup";
  const VISIBLE = "is-visible";

  const btn = document.querySelector(BTN_ID);
  const pop = document.querySelector(POPUP_CLASS);

  let popupTimer;

  btn.addEventListener("click", () => {
    clearTimeout(popupTimer);
    pop.classList.add(VISIBLE);
    popupTimer = setTimeout(() => {
      pop.classList.remove(VISIBLE);
    }, 2000);
  });
}

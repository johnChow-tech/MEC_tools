import { templates } from "./config/templates.js";

document.addEventListener("DOMContentLoaded", () => {
  iniTabs(".form-tabs-vertical .f-tab");
  initReportGenerator();
});

/**
 * 初始化 Tab 切换功能
 * @param {string} tabSelector - Tab 按钮的选择器
 */
function iniTabs(tabSelector) {
  const ACTIVED_CLASS = "is-active";
  const PANEL_CLASS = ".work-log-panel";
  const tabButtons = document.querySelectorAll(tabSelector);
  const contentPanels = document.querySelectorAll(PANEL_CLASS);

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove(ACTIVED_CLASS);
      });
      button.classList.add(ACTIVED_CLASS);

      const targetId = button.dataset.target;
      const targetPanel = document.querySelector(targetId);

      contentPanels.forEach((panel) => panel.classList.remove(ACTIVED_CLASS));
      if (targetPanel) {
        targetPanel.classList.add(ACTIVED_CLASS);
      }
    });
  });
}

/**
 * 初始化报告生成和复制功能
 */
function initReportGenerator() {
  const BTN_ID = "#form-btn";
  const TAB_START_ID = "start-tab-v";
  const TAB_END_ID = "end-tab-v";
  const ACTIVED_TAB_CLASS = ".f-tab.is-active";

  const btn = document.querySelector(BTN_ID);
  const activeTab = document.querySelector(ACTIVED_TAB_CLASS);
  if (!btn || !activeTab) return;

  btn.addEventListener("click", async () => {
    // generate reports based on actived tab
    if (activeTab.id === TAB_START_ID) {
      let template = templates.start;
      const ST_ID = "form-input-st";
      const SWP_ID = "form-input-swp";
      const PC_ID = "form-input-pc";
      // when start tab actived
      const st = document.querySelector("#" + ST_ID).value;
      const swp = document.querySelector("#" + SWP_ID).value;
      const pc = document.querySelector("#" + PC_ID).value;

      reportText = template
        .replace(`{{${ST_ID}}}`, st)
        .replace(`{{${SWP_ID}}}`, swp)
        .replace(`{{${PC_ID}}}`, pc);
    } else if (activeTab.id === TAB_END_ID) {
      // when end tab actived
      let template = templates.end;
      const ET_ID = "form-input-et";
      const EWP_ID = "form-input-ewp";
      const CB_ID = "form-input-cb";
      const SC_ID = "form-input-sc";
      // when start tab actived
      const et = document.querySelector("#" + ET_ID).value;
      const ewp = document.querySelector("#" + EWP_ID).value;
      const cb = document.querySelector("#" + CB_ID).value;
      const sc = document.querySelector("#" + SC_ID).value;

      reportText = template
        .replace(`{{${ET_ID}}}`, et)
        .replace(`{{${EWP_ID}}}`, ewp)
        .replace(`{{${CB_ID}}}`, cb)
        .replace(`{{${SC_ID}}}`, sc);
    } else {
      console.log("ERROR: no tab id found.");
      return;
    }

    if (reportText) {
      await copyToClipboard(reportText);
      showPopup("Copied to Clipboard.");
    }
  });
}

/**
 * 将文本复制到用户的剪贴板
 * @param {string} text - 需要复制的文本
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copy successed.");
  } catch (err) {
    console.log("Copy failed: ", err);
    showPopup("Failed coping to clipboard!!", true);
  }
}

/**
 * 显示一个短暂的 Popup 提示
 * @param {string} message - Popup 中显示的文字
 * @param {boolean} isError - 是否是错误提示
 */
let popupTimer;
function showPopup(message, isError = false) {
  const BTN_ID = "#form-btn";
  const POPUP_ID = "#popup-copied";
  const POPUP_TEXT_ID = "#form-popup-text";
  const VISIBLE = "is-visible";
  const ERR_COLOR_BG = "#FFFBEA";
  const ERR_COLOR_FONT = "#744210";

  const btn = document.querySelector(BTN_ID);
  const pop = document.querySelector(POPUP_ID);
  const popTxt = document.querySelector(POPUP_TEXT_ID);
  if (!btn || !pop || !popTxt) return;

  popTxt.textContent = message;

  btn.addEventListener("click", () => {
    // copyToClipboard("test"); // test
    clearTimeout(popupTimer);
    if (isError) {
      pop.style.backgroundColor = ERR_COLOR_BG;
      popTxt.style.color = ERR_COLOR_FONT;
    }
    pop.classList.add(VISIBLE);
    popupTimer = setTimeout(() => {
      pop.classList.remove(VISIBLE);
    }, 2000);
  });
}

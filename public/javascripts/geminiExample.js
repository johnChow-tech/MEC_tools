document.addEventListener("DOMContentLoaded", () => {
  // 初始化 Tab 切换功能
  initTabs(".form-tabs-vertical .f-tab");

  // 初始化报告生成功能
  initReportGenerator();
});

/**
 * 初始化 Tab 切换功能
 * @param {string} tabSelector - Tab 按钮的选择器
 */
function initTabs(tabSelector) {
  const ACTIVED_CLASS = "is-active";
  const PANEL_CLASS = ".work-log-panel";
  const tabButtons = document.querySelectorAll(tabSelector);
  const contentPanels = document.querySelectorAll(PANEL_CLASS);

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove(ACTIVED_CLASS));
      button.classList.add(ACTIVED_CLASS);

      const targetId = button.dataset.target;
      contentPanels.forEach((panel) => {
        panel.classList.remove(ACTIVED_CLASS);
        if (`#${panel.id}` === targetId) {
          panel.classList.add(ACTIVED_CLASS);
        }
      });
    });
  });
}

/**
 * 初始化报告生成和复制功能
 */
// 在文件最顶部，从 templates.js 导入 templates 对象
import { templates } from "./templates.js";

// document.addEventListener... 和 initTabs 函数保持不变
// ...

function initReportGenerator() {
  const generateBtn = document.querySelector("#form-btn");
  if (!generateBtn) return;

  generateBtn.addEventListener("click", async () => {
    const activeTab = document.querySelector(".f-tab.is-active");
    let reportText = "";

    if (activeTab.id === "start-tab-v") {
      // --- “出勤” 逻辑 ---
      let template = templates.start; // 使用导入的“出勤”模板

      const startTime = document.querySelector("#form-input-st").value;
      const startPlace = document.querySelector("#selector-wp").value;
      const condition =
        document.querySelector("#form-input-pc").value || "問題なし";

      // 替换占位符
      reportText = template
        .replace("{{startTime}}", startTime)
        .replace("{{startPlace}}", startPlace)
        .replace("{{condition}}", condition);
    } else if (activeTab.id === "end-tab-v") {
      // --- “退勤” 逻辑 ---
      let template = templates.end; // 使用导入的“退勤”模板

      const endTime = document.querySelector("#form-input-et").value;
      const endPlace = document.querySelector("#selector-ep").value;
      const canbus =
        document.querySelector("#form-input-cb").value || "投入済み";
      const securityCard =
        document.querySelector("#form-input-sc").value || "持ち帰ります";

      // 替换占位符
      reportText = template
        .replace("{{endTime}}", endTime)
        .replace("{{endPlace}}", endPlace)
        .replace("{{canbus}}", canbus)
        .replace("{{securityCard}}", securityCard);
    }

    if (reportText) {
      await copyToClipboard(reportText);
      showPopup("コピーしました！");
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
    console.log("文本已成功复制到剪贴板");
  } catch (err) {
    console.error("无法复制文本: ", err);
    // 在未来，这里可以显示一个错误提示的 Popup
    showPopup("コピーに失敗しました", true);
  }
}

/**
 * 显示一个短暂的 Popup 提示
 * @param {string} message - Popup 中显示的文字
 * @param {boolean} isError - 是否是错误提示
 */
let popupTimer; // 将定时器ID移到函数外部，以便在全局范围内管理
function showPopup(message, isError = false) {
  const popup = document.querySelector("#popup-copied");
  const popupText = document.querySelector("#form-popup-text");
  if (!popup || !popupText) return;

  // 设置文本和样式
  popupText.textContent = message;
  // 你可以根据 isError 参数来改变 popup 的颜色方案
  // popup.style.backgroundColor = isError ? 'red' : '#333';

  clearTimeout(popupTimer);
  popup.classList.add("is-visible");
  popupTimer = setTimeout(() => {
    popup.classList.remove("is-visible");
  }, 2000);
}

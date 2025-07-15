// templates
const START_WORK_LOG_TEMPLATE = `勤務開始いたします。
【開始時刻】{{form-input-st}}
【開始場所】{{form-input-swp}}
【  体    調  】{{form-input-pc}}`;
const END_WORK_LOG_TEMPLATE = `勤務終了いたします。
【終了時刻】{{form-input-et}}
【終了場所】{{form-input-ewp}}
【Canbus. 】{{form-input-cb}}
【  セキュリティカード  】{{form-input-sc}}`;

// export template for external use
export const templates = {
  start: START_WORK_LOG_TEMPLATE,
  end: END_WORK_LOG_TEMPLATE,
};

import { message } from "antd";

message.config({
  top: 70,
  duration: 2,
  maxCount: 3
});

const ShowToast = (msg, type = "info") => {
  switch (type) {
    case "info":
      message.info(msg);
      break;
    case "success":
      message.success(msg);
      break;
    case "warning":
      message.warn(msg);
      break;
    case "error":
      message.error(msg);
      break;
    default:
      message.info(msg);
      break;
  }
};

export default ShowToast;

import { toast } from "react-toastify";

// errorHandler.js
export const handleErrorResponse = (error, navigate) => {
  if (error.response) {
    // Có phản hồi từ server với status code nằm ngoài 2xx
    const { status, data } = error.response;
    console.log("data", data);

    if (status === 400) {
      toast.error(data.error || data.message || "Bad request");
    } else if (status === 401) {
      // navigate("/login");
      toast.error(data.error || data.message || "Unauthorized");
    } else if (status === 403) {
      // navigate("/login");
      toast.error(data.error || data.message || "Forbidden");
    } else if (status === 404) {
      toast.error("Resource not found");
    } else if (status === 500) {
      toast.error(data.message || "Server error. Please try again later.");
    } else {
      toast.error(data.error || "An error occurred");
    }
  } else if (error.request) {
    // Request được gửi đi nhưng không nhận được phản hồi từ server
    toast.error("No response from server. Please check your network.");
  } else {
    // Một lỗi khác xảy ra khi thiết lập request
    toast.error("An unexpected error occurred");
  }
};

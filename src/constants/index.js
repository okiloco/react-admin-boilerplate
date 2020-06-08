export const URL_BASE =
  window.location.hostname === "localhost"
    ? /* ? "http://localhost:3030" */ "https://api.marthazuccardi.com"
    : "https://api.marthazuccardi.com";
export const URL_AUTHENTICATION = "/authentication";

export const DEFAULT_AVATAR_IMAGE = "/images/avatar.png";
export const DEFAULT_IMAGE = "/images/mockup.png";

export const URL_S3_SERVER =
  window.location.hostname === "localhost"
    ? /* ? "http://localhost:3030" */ "https://api.marthazuccardi.com"
    : "https://api.marthazuccardi.com";
export const URL_S3 = "https://marthazuccardi.s3.amazonaws.com/";

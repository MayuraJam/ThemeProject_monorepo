const helmet = require("helmet");

//ปิด header หมด
const helmetConfig = helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
});

module.exports = helmetConfig;
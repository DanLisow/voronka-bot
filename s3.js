const EasyYandexS3 = require("easy-yandex-s3").default;

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.S3_YANDEX_PUBLIC_KEY,
    secretAccessKey: process.env.S3_YANDEX_SECRET_KEY,
  },
  Bucket: "voronka-bot", // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

module.exports = s3;

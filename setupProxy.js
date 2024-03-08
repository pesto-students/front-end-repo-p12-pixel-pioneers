import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://quizzify-4.onrender.com/", // Update with your backend server URL
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
}

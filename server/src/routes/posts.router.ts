import router from "../utils/router";

router.get("/", (_req, res) => {
  res.send("GET /api/posts");
});

export default router;

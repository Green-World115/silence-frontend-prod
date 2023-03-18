import { createRouter } from "next-connect";

import commentController from "backend/controllers/comment-controller";
import authMiddleware from "backend/middlewares/auth-middleware";
import ApiError from "backend/utils/api-error";
import httpStatus from "http-status";

const router = createRouter();

router.use(authMiddleware).delete(commentController.deleteComment);

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    throw new ApiError("Not found", httpStatus.NOT_FOUND);
  },
});

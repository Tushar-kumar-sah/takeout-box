import { Router } from "express";
import { ChatController } from "../controllers/chatController.js";

const router = Router();

// POST /api/v1/chat/message or POST /api/v1/chat
router.post("/message", ChatController.sendMessage);
router.post("/", ChatController.sendMessage);

export default router;

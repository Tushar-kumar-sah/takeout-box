import { Request, Response } from "express";
import { ChatService, ChatMessage } from "../services/chatService.js";

export class ChatController {
  static async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        res.status(400).json({
          success: false,
          message: "A valid message string is required.",
        });
        return;
      }

      const history: ChatMessage[] = Array.isArray(conversationHistory)
        ? conversationHistory.filter(
            (m) =>
              m &&
              typeof m.content === "string" &&
              (m.role === "user" || m.role === "assistant" || m.role === "system")
          )
        : [];

      const result = await ChatService.processMessage(message.trim(), history);

      res.status(200).json({
        success: true,
        reply: result.reply,
        suggestedProducts: result.suggestedProducts || [],
        action: result.action || "none",
      });
    } catch (err: any) {
      console.error("[ChatController] Error processing chat message:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Failed to process chat message.",
      });
    }
  }
}

import express from "express";
import { getStudy,createdStudy,deletedStudy,updateStudy } from "../Controllers/StudyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const Router = express.Router();

Router.get("/study",authMiddleware,getStudy);
Router.post("/new/study",authMiddleware,createdStudy);
Router.put("/:id/update",authMiddleware,updateStudy);
Router.delete("/:id/delete",authMiddleware,deletedStudy);

export default Router;
import express from "express";
import { getSearchSuggestions, searchContent } from "../controllers/search.controller.js";

//Routing to search videos
const router = express.Router();

router.get("/suggestions", getSearchSuggestions);
router.get("/", searchContent);

export default router;
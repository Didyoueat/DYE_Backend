import { Router } from "express";
import * as info from "@controllers/admin/info";
import * as retrieve from "@controllers/admin/overall";

import terminus from "@middlewares/terminus";

export const path: string = "/admin";
export const router: Router = Router();

// 전체 관리자 조회 API
router.get("/", terminus(retrieve.getAllAdminList));

// 관리자 정보 관련 API
router.post("/create", terminus(info.createAdmin));
router.get("/:userId", terminus(info.getAdmin));
router.patch("/:userId", terminus(info.updateAdmin));
router.delete("/:userId", terminus(info.deleteAdmin));

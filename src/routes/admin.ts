import { Router } from "express";
import * as info from "@controllers/admin/info";
import * as retrieve from "@controllers/admin/retrieve";

import afterware from "@middlewares/afterware";

export const path: string = "/admin";
export const router: Router = Router();

// 전체 관리자 조회 API
router.get("/", afterware(retrieve.getAllAdminList));

// 관리자 정보 관련 API
router.get("/:userId", afterware(info.getAdmin));
router.post("/create", afterware(info.createAdmin));
router.patch("/:userId", afterware(info.updateAdmin));
router.delete("/:userId", afterware(info.deleteAdmin));

import { Router } from "express";
import * as info from "@controllers/admin/info";
import * as retrieve from "@controllers/admin/retrieve";

export const path: string = "/admin";
export const router: Router = Router();

// 전체 관리자 조회 API
router.get("/", retrieve.getAllAdminList);

// 관리자 정보 관련 API
router.get("/:userId", info.getAdmin);
router.post("/create", info.createAdmin);
router.patch("/:userId", info.updateAdmin);
router.delete("/:userId", info.deleteAdmin);

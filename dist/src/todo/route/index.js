"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const index_1 = __importDefault(require("../../middleware/index"));
const index_2 = __importDefault(require("../controller/index"));
const router = express_1.default.Router();
router.post("/create", validator_1.default.checkCreateTodo(), index_1.default.handleValidationError, index_2.default.create);
router.get("/read", validator_1.default.checkReadTodo(), index_1.default.handleValidationError, index_2.default.readPagination);
router.get("/read/:id", validator_1.default.checkIdParam(), index_1.default.handleValidationError, index_2.default.readById);
router.put("/update/:id", validator_1.default.checkIdParam(), index_1.default.handleValidationError, index_2.default.update);
router.delete("/delete/:id", validator_1.default.checkIdParam(), index_1.default.handleValidationError, index_2.default.delete);
exports.default = router;

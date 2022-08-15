"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const index_1 = require("../model/index");
// import TodoValidator from "../validator";
// import Middleware from "../middleware/index";
class TodoController {
    async create(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const record = await index_1.TodoInstance.create({ ...req.body, id });
            return res.json({ record, msg: "succesfully create todo" });
        }
        catch (e) {
            return res.json({
                msg: "failed to create",
                status: 500,
                route: "/create",
            });
        }
    }
    async readPagination(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const limit = req.query?.limit;
            const records = await index_1.TodoInstance.findAll({
                where: {},
                limit,
            });
            return res.json(records);
        }
        catch (e) {
            return res.json({
                msg: "failed to create",
                status: 500,
                route: "/read",
            });
        }
    }
    async readById(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({
                where: { id },
            });
            return res.json(record);
        }
        catch (e) {
            return res.json({
                msg: "failed to create",
                status: 500,
                route: "/read:id",
            });
        }
    }
    async update(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({
                where: { id },
            });
            if (!record) {
                return res.json({ msg: "can not find existing record" });
            }
            const updatedRecord = await record.update({
                completed: !record.getDataValue("completed"),
            });
            return res.json({ record: updatedRecord });
        }
        catch (e) {
            return res.json({
                msg: "failed to create",
                status: 500,
                route: "/update:id",
            });
        }
    }
    async delete(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({
                where: { id },
            });
            if (!record) {
                return res.json({ msg: "can not find existing record" });
            }
            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord });
        }
        catch (e) {
            return res.json({
                msg: "failed to create",
                status: 500,
                route: "/delete:id",
            });
        }
    }
}
exports.default = new TodoController();

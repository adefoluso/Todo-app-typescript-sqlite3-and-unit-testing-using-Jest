import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model/index";
// import TodoValidator from "../validator";
// import Middleware from "../middleware/index";

class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();

    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "succesfully create todo" });
    } catch (e) {
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/create",
      });
    }
  }

  async readPagination(req: Request, res: Response) {
    const id = uuidv4();

    try {
      const limit = req.query?.limit as number | undefined;
      const records = await TodoInstance.findAll({
        where: {},
        limit,
      });
      return res.json(records);
    } catch (e) {
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/read",
      });
    }
  }

  async readById(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({
        where: { id },
      });
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/read:id",
      });
    }
  }

  async update(req: Request, res: Response) {
    const id = uuidv4();

    try {
      const { id } = req.params;

      const record = await TodoInstance.findOne({
        where: { id },
      });

      if (!record) {
        return res.json({ msg: "can not find existing record" });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });

      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/update:id",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = uuidv4();

    try {
        const { id } = req.params;
    
        const record = await TodoInstance.findOne({
          where: { id },
        });
    
        if (!record) {
          return res.json({ msg: "can not find existing record" });
        }
    
        const deletedRecord = await record.destroy();
        return res.json({record: deletedRecord})
      } catch (e) {
        return res.json({
          msg: "failed to create",
          status: 500,
          route: "/delete:id",
        });
      }
  }
}

export default new TodoController();

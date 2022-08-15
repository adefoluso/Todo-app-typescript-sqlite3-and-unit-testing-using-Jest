import { body, query, param } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
      body("title")
        .notEmpty()
        .withMessage("The title value should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("The value should be a boolean")
        .isIn([0, false])
        .withMessage("The value should be O or false"),
    ];
  }

  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("limit should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("The limit value should be number between 1-10"),
        query("offset").optional().isNumeric().withMessage("The value should be a number")
    ];
  }

  checkIdParam() {
      return [
          param("id").notEmpty().withMessage("The value should not be empty").isUUID(4).withMessage("The value should uuid v4")
      ]
  }
}

export default new TodoValidator();

module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    // Создать новый студент
    router.post("/", students.create);

    // Получить все учебные пособия
    router.get("/", students.findAll);

    // Получить одного студента с id
    router.get("/:id", students.findOne);

    // Обновите студент с id
    router.put("/:id", students.update);

    // Удалить студент с id
    router.delete("/:id", students.delete);

    // Удалить всех студентов
    router.delete("/", students.deleteAll);

    app.use('/api/students', router);
};
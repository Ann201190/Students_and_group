module.exports = app => {
    const groups = require("../controllers/group.controller.js");

    var router = require("express").Router();

    // Создать новый группы
    router.post("/", groups.create);

    // Получить все группы
    router.get("/", groups.findAll);

    // Получить одну группу с id
    router.get("/:id", groups.findOne);

    // Обновите группы с id
    router.put("/:id", groups.update);

    // Удалить группы с id
    router.delete("/:id", groups.delete);

    // Удалить все группы
    router.delete("/", groups.deleteAll);

    app.use('/api/groups', router);
};
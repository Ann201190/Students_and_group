/*create  -  создать
findAll - найти все
findOne - найти один
update - Обновить
delete - удалить один
deleteAll  - удалить все*/


const db = require("../models");
const Group = db.groups;
const Op = db.Sequelize.Op;

// Создать и сохранить новый группу
exports.create = (req, res) => {
    // Подтвердить запрос
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Создать группу
    const grpup = {
        title: req.body.title,
    };

    // Сохранить группу в базе данных
    Group.create(grpup)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Group."
            });
        });
};

// Получить все группуи из базы данных.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null; //Мы используем req.query.titleдля получения строки запроса из Request и рассматриваем ее как условие для findAll()метода.

    Group.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Groups."
            });
        });
};

// Найдите один группу с id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Group.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Group with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Обновите группу по id в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Group.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Group was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Group with id=" + id
            });
        });
};

// Удалить группу с указанным в запросе id
exports.delete = (req, res) => {
    const id = req.params.id;

    Group.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Group was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Group with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Group with id=" + id
            });
        });
};
// Удалите все групп из базы данных.
exports.deleteAll = (req, res) => {
    Group.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Groups were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Groups."
            });
        });
};


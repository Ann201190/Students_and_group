/*create  -  создать
findAll - найти все
findOne - найти один
update - Обновить
delete - удалить один
deleteAll  - удалить все
*/


const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Создать и сохранить нового студента
exports.create = (req, res) => {
    // Подтвердить запрос
    if (!req.body.fio) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Создать студента
    const student = {
        fio: req.body.fio,
        bday: req.body.bday,
        id_group: req.body.id_group
    };

    // Сохранить студента в базе данных
    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        });
};

// Получить все студентов из базы данных.
exports.findAll = (req, res) => {
    const fio = req.query.fio;
    var condition = fio ? { fio: { [Op.like]: `%${fio}%` } } : null; //Мы используем req.query.titleдля получения строки запроса из Request и рассматриваем ее как условие для findAll()метода.

    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students."
            });
        });
};

// Найдите один студента с id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Обновите студента по id в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};

// Удалить студента с указанным в запросе id
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};
// Удалите все студентов из базы данных.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Students were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};


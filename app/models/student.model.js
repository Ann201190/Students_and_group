//определяем модель сиквелизации
module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        fio: {
            type: Sequelize.STRING
        },
        bday: {
            type: Sequelize.INTEGER
        },
        id_group: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'groups',
                key: 'id'
            }
        }
    });
    return Student;
};


/*Эта модель Sequelize представляет собой таблицу руководств в базе данных MsSQL.
 Эти столбцы будут сгенерированы автоматически: id , fio , bday , id_group , createdAt , updatedAt .

После инициализации Sequelize нам не нужно писать CRUD-функции, Sequelize поддерживает их все:

создать новый учебник: create(object)
найти учебник по идентификатору: findByPk(id)
получить все уроки: findAll()
обновить учебник по идентификатору: update(data, where: { id: id })
удалить учебник: destroy(where: { id: id })
удалить все учебники: destroy(where: {})
найти все учебные пособия по названию: findAll({ where: { title: ... } })*/



//Эти функции будут использоваться в нашем контроллере.
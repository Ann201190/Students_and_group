const express = require("express"); //предназначен для создания API Rest
const bodyParser = require("body-parser"); //парсит json
const cors = require("cors"); //предоставляет промежуточное ПО Express для поддержки CORS с различными параметрами


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//парсить запросы типа содержимого - application / json
app.use(bodyParser.json());

// парсить запросы типа содержимого - application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models"); //БД
db.sequelize.sync();
//В процессе разработки вам может потребоваться удалить существующие таблицы и повторно синхронизировать базу данных.
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/


// простой маршрут
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/student.routes")(app);
require("./app/routes/group.routes")(app);
// установить порт, слушать запросы
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
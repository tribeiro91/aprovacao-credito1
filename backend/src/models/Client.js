const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const hooks = {};

const tableName = "clients";

const Cliente = sequelize.define(
    "Cliente",
    {
        id: {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        nome : {
            type: Sequelize.STRING,
            allowNull: false
        },
        pontuacao : {
             type: Sequelize.INTEGER,
             allowNull: false
        },
        credito : {
                type: Sequelize.STRING,
                allowNull: false
        },
        createdAt :{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt : {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue : Sequelize.NOW
        }
    },
    {
        hooks,
        tableName
    }
);

Cliente.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Cliente;


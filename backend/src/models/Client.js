const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const CreditRequest = require("./CreditRequest")
const hooks = {};

const tableName = "clients";

const Client = sequelize.define(
    "Client",
    {
        id: {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf : {
            type: Sequelize.STRING,
            allowNull: false
        },
        salary : {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        score : {
             type: Sequelize.INTEGER,
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

Client.hasOne(CreditRequest);

Client.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Client;


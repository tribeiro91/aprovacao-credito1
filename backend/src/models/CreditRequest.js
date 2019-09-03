const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const hooks = {};

const tableName = "creditRequests";

const CreditRequest = sequelize.define(
    "CreditRequest",
    {
        id: {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        isApproved : {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        credit : {
            type: Sequelize.DECIMAL,
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

CreditRequest.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    return values;
};



module.exports = CreditRequest;


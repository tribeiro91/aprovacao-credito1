const Sequelize = require("sequelize")
const sequelize = require("../config/database")
const Client = require("./Client")

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
        },
        clientId: {
            type: Sequelize.INTEGER
        }

    },
    {
        hooks,
        tableName
    }
);

CreditRequest.associate = (models) => {
    CreditRequest.belongsTo(models.Client, {
        foreignKey: 'clientId',
        targetKey : 'clientId'
        
    })
    
}


CreditRequest.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    return values;
};



module.exports = CreditRequest;


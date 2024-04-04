
module.exports = (sequelize, DataTypes) =>{
    const name = "UserRolls";
    const constructor = {
        id : {
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
        },
        userRoll:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    };
    const config = {
        tableName: "userroll",
        timestamps: false
    };
    const Roll= sequelize.define(name, constructor, config)
    Roll.associate = function (models) {
        Roll.hasMany(models.Users,{
            as: "users",
            foreignKey : "userRoll_id"
        })
    }
    return Roll
}
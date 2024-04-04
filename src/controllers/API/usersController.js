const db = require ("../../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiUsersController = {

    allUsers: async (req,res) => {
        try{
            findUsers = await db.Users.findAll({raw:true, include: [{ association: "roll" }]});
            
            console.log(findUsers);

           let FinalUser = findUsers.map(user => {

                delete user.password
               /*  delete user.id */
                console.log(user);

                return user
                
            });

            res.json({
                total:findUsers.length,
                data: FinalUser,
                status: 700
            });

        }
        catch(error){
           res.send(error)
        }
    },

    userId: async (req,res) => {
       try{
        let userFound = await db.Users.findByPk(req.params.id, {raw:true, include: [{ association: "roll" }]})
        console.log(userFound);

            delete userFound.password

            return res.json({
                data:{
                    userFound,
                    imageURL:`/public/img/avatars/${userFound.avatar}`
                },
                status:400
            })


       }catch(error){
               res.send(error)
       }
    }

}

module.exports = apiUsersController;
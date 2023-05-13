const db = require("../../../database/models");

const usersAPI = {
  list: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: { exclude: ["password", "avatar"] },
      });

      let respuesta = {
        count: {
          status: 200,
          total: users.length,
        },
        users: users.map((user) => {
          return {
            id: user.id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
            detail: {
              url: `http://localhost:3001/api/users/${user.id}`,
            },
          };
        }),
      };
      res.json(respuesta);
    } catch (error) { console.log(error) }
  },

  detail: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (user) {
        const { id, first_name, last_name, email, avatar } = user;

        let respuesta = {
          status: 200,
          data: { id, first_name, last_name, email, avatar },
          detail: {
            url: `http://localhost:3001/images/avatars/${avatar}`,
          }
        };

        res.json(respuesta);
      
        } else {
        res.status(404).json({ error: "Usuario no encontrado" });
        }
    } 
    catch (error) {console.log(error)}
  },
};

module.exports = usersAPI;

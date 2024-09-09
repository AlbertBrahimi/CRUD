const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, last_name, email } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        last_name,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res)=>{

  try {
    const { id } = req.params;
    const { name, last_name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        last_name,
        email,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};

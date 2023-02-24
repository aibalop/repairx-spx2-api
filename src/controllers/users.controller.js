import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.service.js';

const create = async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getAll = async (req, res) => {
  try {
    const query = req.query ?? {};
    query['ignoreId'] = req.payload?._id;
    const users = await usersService.getAll(query);
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const getByid = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await usersService.getById(_id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No se encontro al usuario' });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
};

const update = async (req, res) => {

  try {
    const updated = await usersService.update(req.params._id, req.body);

    if (updated.matchedCount === 0 && updated.modifiedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuario no encontrado' });
    }

    res.status(StatusCodes.NO_CONTENT).json({});

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
  }

};

export default {
  create,
  getAll,
  getByid,
  update,
};

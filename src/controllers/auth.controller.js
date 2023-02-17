import { StatusCodes } from 'http-status-codes';
import usersService from '../services/users.service.js';
import jwtUtil from '../utils/jwt.util.js';
import hashUtil from '../utils/hash.util.js';

const signIn = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await usersService.getByUsername(username);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `No se encontro el usuario: ${username}` });
        }

        if (!hashUtil.compare(password, user.password)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Contraseña incorrecta' });
        }

        const userPayload = {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
        };

        const token = jwtUtil.sign(userPayload);

        res.status(StatusCodes.OK).json({
            message: 'Acceso autorizado',
            token,
            user: userPayload
        });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

export default { signIn };

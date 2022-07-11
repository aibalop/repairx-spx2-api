import bcrypt from 'bcrypt';

const salts = 10;

const generate = value => bcrypt.hashSync(value, salts);

const compare = (value, valueEncrypted) => bcrypt.compareSync(value, valueEncrypted);

export default {
    generate,
    compare,
};

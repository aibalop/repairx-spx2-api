import currency from 'currency.js';

const getFormattedPhone = (phone) => `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.slice(6, 8)}-${phone.substring(8, 10)}`;

const getFormattedDate = (date, withTime = true) => new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...withTime ? {
        hour: withTime ? '2-digit' : '',
        minute: withTime ? '2-digit' : '',
    } : { }
});

const getFormattedAmount = (amount) => currency(amount).format();

export default {
    getFormattedPhone,
    getFormattedDate,
    getFormattedAmount,
};

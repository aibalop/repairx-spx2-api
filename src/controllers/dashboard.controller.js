import { StatusCodes } from "http-status-codes";
import dashboardService from '../services/dashboard.service.js';
import { convertLocalDateToUTCDate } from '../utils/dates-helper.util.js';
import { OrderRepairStatus } from '../utils/status.util.js';

const getSummary = async (req, res) => {

    try {

        const query = req.query;

        if (!query) {
            throw new Error('Datos de entrada incorrectos');
        }

        const filters = {};

        if (query.fromDate && query.toDate && query.timeZone) {
            const fromDate = convertLocalDateToUTCDate(Number(query.fromDate), Number(query.timeZone));
            const toDate = convertLocalDateToUTCDate(Number(query.toDate), Number(query.timeZone));

            filters['createdAt'] = { $gte: fromDate, $lte: toDate };
        }

        const revenue = await dashboardService.getRevenue({
            ...filters,
            status: { '$ne': OrderRepairStatus.CANCELED },
            isPaid: true,
        });

        const totalOrderRepairs = await dashboardService.getTotalOrderRepairs({
            ...filters,
            status: { '$ne': OrderRepairStatus.CANCELED },
        });

        const totalNewCustomers = await dashboardService.getTotalOfCustomers(filters);

        res.status(StatusCodes.OK).json({
            revenue,
            totalOrderRepairs,
            totalNewCustomers,
        });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }

};


export default {
    getSummary,
};

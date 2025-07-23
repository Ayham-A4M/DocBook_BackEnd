const appointmentModel = require('../../models/appointmentModel')
const isHoliday = require('../../helper/isHoliday');
const AppError = require('../../utils/AppError');
const stripeProcces = require('../../utils/stripeProcces');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const handleTakeAppointment = async (req, res, next) => {
    try {

        const userId = res.locals.id;
        const { doctorId, date_time, date, time, fee, reason, paymentWay } = req.body
        const obj = {
            doctorId,
            userId,
            date_time,
            date,   //its like 2025-5-2 yyyy-MM-dd
            time,   //its like 11:30AM
            fee,
            reason,
            paymentWay, // only stripe or cash
        }
        if (await isHoliday(date)) {
            throw new AppError(400, 'soory this day is holiday')
        }
        if (paymentWay === 'cash') {
            const new_appointment = new appointmentModel(obj);
            const response = await new_appointment.save()
            if (response) {
                return res.status(200).send({ msg: 'Appointment created be care until you visit doctor :)' });
            }
        }
        else {

            try {

                const session = await stripe.checkout.sessions.create({
                    //information 
                    payment_method_types: ['card'], // different way to accept so we choose just card
                    mode: 'payment',
                    line_items: [{
                        price_data: {
                            currency: 'USD',
                            product_data: {
                                name: `Appointment with doctor date:${obj.date_time}`
                            },

                            unit_amount: Math.round(obj.fee * 100)
                        },
                        quantity: 1,

                    }],

                    success_url: `https://www.google.com`, //where will send client on success 
                    cancel_url: `https://chat.deepseek.com/`, //fail url
                    metadata: {
                        userId: userId,
                        appointmentInformation: JSON.stringify(obj),
                    },
                })
                return res.status(200).send({ url: session.url });
            } catch (err) {
                throw err;// to handleTakeAppointment catch errors
            }
        }


    } catch (err) {
        if (err.code === 11000) {
            // Check which constraint failed
            if (err.keyPattern.doctorId) {
                next(new AppError(403, "Doctor unavailable at this time"))

                // throw new Error("Doctor unavailable at this time");
            } else if (err.keyPattern.userId) {
                next(new AppError(403, "You're already booked at this time"))
            } else {
                next(err)
            }
        }
    }
}

module.exports = handleTakeAppointment
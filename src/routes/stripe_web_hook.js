
const express = require('express');
const AppError = require('../utils/AppError');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const router = require('express').Router();
const appointmentModel = require('../models/appointmentModel');

router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
    const sig = req.headers['stripe-signature']; //the siginture that come in header of req to this endpoint 
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET // the endpoint secret webhook that you have stripe listen ..... endpoint

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        next(new AppError(400, `Webhook Error: ${err.message}`))
    }

    switch (event?.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            try {
                const userId = session.metadata.userId; //userId from  data base that i send it with meta data
                const appointmentInformation = JSON.parse(session.metadata.appointmentInformation);
                if (!userId || !appointmentInformation) {
                    throw new AppError(400, 'Missing required metadata in session');
                }
                // the user payment complete so its time to start update the data base 
                const new_appointment = new appointmentModel({ ...appointmentInformation, userId: userId });
                const response = await new_appointment.save()
                if (response) {
                    return res.status(200).json({ received: true });
                }

            } catch (err) {
                next(new Error('Internal Server Error'))
            }

        default:
            return res.status(200).json({ received: true });
    }
});

module.exports = router

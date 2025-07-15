require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const stripeProcces = async (appointmentInformation, userId) => {
    // try {
    //     console.log('entring the stripe procces');
    //     const session = await stripe.checkout.sessions.create({
    //         //information 
    //         payment_method_types: ['card'], // different way to accept so we choose just card
    //         mode: 'payment',
    //         line_items: {
    //             price_data: {
    //                 currency: 'USD',
    //                 product_data: {
    //                     name: `Appointment with doctor date:${appointmentInformation.date_time}`
    //                 },

    //                 unit_amount: Math.round(appointmentInformation.fee * 100)
    //             },
    //             quantity: 1,

    //         },

    //         success_url: `https://www.google.com`, //where will send client on success 
    //         cancel_url: `https://chat.deepseek.com/`, //fail url
    //         metadata: {
    //             userId: userId,
    //             appointmentInformation: JSON.stringify(appointmentInformation),
    //         },
    //     })
    //     return session.url
    // } catch (err) {
    //     console.log(err);
    //     throw err;// to handleTakeAppointment catch errors
    // }
    console.log('test');
    return true;
}
module.exports = stripeProcces

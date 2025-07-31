const Stripe = require('stripe');
module.exports.stripe = Stripe(process.env.STRIPE_SECRET_KEY);

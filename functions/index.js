const functions = require("firebase-functions");

const stripe = require("stripe")(
  "sk_test_51HTrdNKvlLDAjAUzi8u2jGnHqF2SkxKmRG91jjcq70LxTeJcXeAuX9SuSeuzDQeegVeYrdfa9MBByfAELT0ylVyi00zOCmEdWL"
);

exports.completePaymentWithStripe = functions.https.onRequest(
  (request, response) => {
    stripe.charges
      .create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: "tok_mastercard", // change 'source' when you are not doing testing
      })
      // eslint-disable-next-line promise/always-return
      .then((charge) => {
        console.log("NO ERROR FOUND");
        response.send(charge);
      })
      .catch((error) => {
        console.log("ERROR FOUND");
        console.log(error);
      });
  }
);

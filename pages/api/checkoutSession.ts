import Stripe from "stripe";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handleCheckoutSession(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2022-11-15",
  });

  interface checkoutItems {
    name: string;
    price: number;
    quantity: number;
    images: string;
  }

  if (request.method === "POST") {
    try {
      const session = await stripeInstance.checkout.sessions.create({
        line_items: request.body.items.map((item: checkoutItems) => {
          const img = item.images;
          return {
            price: "price_1MSPx6G3yJgoLscAUUjplpIW",
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${request.headers.origin}/success`,
        cancel_url: `${request.headers.origin}/cancel`,
        payment_method_types: ["card"],
        submit_type: "pay",
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MSKhIG3yJgoLscAPB082UFX" },
          { shipping_rate: "shr_1MSKktG3yJgoLscAucCZfinB" },
        ],
      });

      return response.status(200).json({ id: session.id });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        response
          .status(500)
          .json({ statusCode: 500, message: "Something went wrong" });
      }
    }
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method Not Allowed");
  }
}

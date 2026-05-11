import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

/**
 * @swagger
 * /api/stripe/create-subscription-intent:
 *   post:
 *     tags:
 *       - Stripe
 *     summary: Crear intención de suscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productDescription
 *               - productPrice
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Plan Premium"
 *               productDescription:
 *                 type: string
 *                 example: "Acceso total a la plataforma"
 *               productPrice:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/create-subscription-intent", async (req, res) => {
    const { productName, productDescription, productPrice } = req.body;
  try {
    // 1. Crear el producto
    const product = await stripe.products.create({
      name: productName,
      description: productDescription,
    });

    // 2. Crear el precio asociado a ese producto
    const price = await stripe.prices.create({
      unit_amount: productPrice * 100, // $20.00 (en centavos)
      currency: "usd",
      recurring: { interval: "month" },
      product: product.id,
    });

    res.json({ productId: product.id, priceId: price.id });
  } catch (error) {
    console.error("Error creating subscription intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Este es el endpoint que el Stripe CLI está "escuchando"
router.post('/webhook', (req, res) => {
    try {
    // console.log('Webhook Stripe', req.body);
    const event = req.body;

    // Manejar el tipo de evento
    switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('¡Pago exitoso detectado!');
      // AQUÍ: Actualizas tu MySQL para darle acceso al usuario
      break;
    
    case 'invoice.payment_failed':
      console.log('El cobro de la suscripción falló');
      // AQUÍ: Bloqueas el acceso al usuario
      break;
      
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  // Siempre responde con un 200 para que Stripe no piense que falló
  res.json({received: true});
  } catch (error) {
    console.error("Error creating subscription intent:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

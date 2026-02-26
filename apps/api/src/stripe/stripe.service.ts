import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2025-02-24' as any,
        });
    }

    async createCheckoutSession(orderId: string, amount: number, customerEmail: string) {
        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'sar',
                        product_data: {
                            name: `Furniture Order #${orderId}`,
                        },
                        unit_amount: Math.round(amount * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${this.configService.get('FRONTEND_URL')}/orders/${orderId}/success`,
            cancel_url: `${this.configService.get('FRONTEND_URL')}/orders/${orderId}/cancel`,
            metadata: { orderId },
            customer_email: customerEmail,
        });
    }

    constructEvent(payload: any, sig: string) {
        const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        return this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
}

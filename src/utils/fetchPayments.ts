import { PaymentMethod } from "@/types/payment";

const baseUrl = "https://api.adkey-seo.com/storage/images/payments/";

export async function fetchPayments(): Promise<PaymentMethod[]> {
  try {
    const siteId = process.env.NEXT_PUBLIC_SITE_ID;
    if (!siteId) throw new Error("Missing SITE_ID in environment variables");

    const response = await fetch(
      `https://api.adkey-seo.com/api/website/get-payments/${siteId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching payment methods: ${response.statusText}`);
    }
    const paymentMethods: PaymentMethod[] = await response.json();

    const updatedPaymentMethods = paymentMethods.map(
      (method: PaymentMethod) => ({
        ...method,
        image: `${baseUrl}${method.image}`,
      })
    );

    return updatedPaymentMethods;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
}

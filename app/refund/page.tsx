import PolicyLayout from '../legal/layout';

export default function RefundPage() {
  return (
    <PolicyLayout>
      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Refunds policy</h1>
      <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-12">Last Updated: 06.04.2026</p>

      <h3>1. Cancellations</h3>
      <p>You may cancel your uOrder subscription at any time through your account dashboard. Upon cancellation, you will continue to have access to the Service until the end of your current paid billing period.</p>

      <h3>2. Refunds</h3>
      <ul>
        <li><strong>Digital Content:</strong> Since uOrder provides immediate access to digital services, we generally do not offer refunds for periods already paid.</li>
        <li><strong>14-Day Satisfaction Guarantee:</strong> For new customers, we offer a full refund if requested within the first 14 days of the initial subscription.</li>
        <li><strong>Billing Errors:</strong> If you believe you have been charged incorrectly, please contact us within 30 days of the transaction.</li>
      </ul>

      <h3>3. Refund Process</h3>
      <p>To request a refund, please email <strong>uorder.app.menu@gmail.com</strong> with your account details and the reason for the request. Approved refunds will be processed back to the original payment method within 5-10 business days.</p>
    </PolicyLayout>
  );
}
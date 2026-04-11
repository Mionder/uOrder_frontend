import PolicyLayout from '../legal/layout';

export default function TermsPage() {
  return (
    <PolicyLayout>
      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Terms of use</h1>
      <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-12">Last Updated: 06.04.2026</p>
       
      <h3>1. Service Provider</h3>
      <p>The Service is provided by <strong>Individual Entrepreneur (FOP) Oliinyk Serhii Oleksandrovych</strong>, registered under the laws of Ukraine (ITN: 3686503510), address: 60 Avtozavodska St, apt. 92, Zaporizhzhia, Ukraine, 69118.</p>

      <h3>2. Subject of the Agreement</h3>
      <p>uOrder provides a cloud-based software-as-a-service (SaaS) solution that allows restaurants and businesses to create, manage, and display digital menus via QR codes.</p>

      <h3>3. Subscriptions and Payments</h3>
      <ul>
        <li>Payments are processed via third-party providers (e.g., Fondy).</li>
        <li>By providing payment information, you authorize us to charge the applicable subscription fees (Monthly or Yearly) to your payment method.</li>
        <li>All prices are listed in the chosen currency (PLN, EUR, or UAH).</li>
      </ul>

      <h3>4. Intellectual Property</h3>
      <p>All software, designs, and content provided by uOrder are the exclusive property of FOP Oliinyk Serhii Oleksandrovych. Users are granted a non-exclusive, non-transferable license to use the Service during their subscription period.</p>

      <h3>5. Limitation of Liability</h3>
      <p>The Service is provided "as is". We are not liable for any indirect damages or loss of business profits resulting from the use of the Service.</p>

      <h3>6. Governing Law</h3>
      <p>These Terms are governed by the laws of Ukraine. Any disputes shall be settled in the competent courts of Ukraine.</p>
    </PolicyLayout>
  );
}
import PolicyLayout from '../legal/layout';

export default function PrivacyPage() {
  return (
    <PolicyLayout>
      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Privacy policy</h1>
      <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-12">Last Updated: 06.04.2026</p>

      <h3>1. Data We Collect</h3>
      <ul>
        <li><strong>Account Data:</strong> Email address, restaurant name, and contact details provided during registration.</li>
        <li><strong>Usage Data:</strong> IP addresses, browser types, and interaction with the digital menu.</li>
        <li><strong>Payment Data:</strong> We do not store credit card details. All payments are processed securely by Fondy.</li>
      </ul>

      <h3>2. Legal Basis for Processing (GDPR)</h3>
      <p>For users in the European Union, we process data based on the necessity to perform a contract (providing the Service) and our legitimate interest in improving our platform.</p>

      <h3>3. Data Sharing</h3>
      <p>We share your data only with essential service providers:</p>
      <ul>
        <li><strong>Payment Processors:</strong> Fondy (for transaction handling).</li>
        <li><strong>Hosting:</strong> Cloud infrastructure providers.</li>
      </ul>

      <h3>4. Your Rights</h3>
      <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at uorder.app.menu@gmail.com.</p>

      <h3>5. Cookies</h3>
      <p>We use cookies to maintain your session and remember your preferences. You can disable cookies in your browser settings.</p>
    </PolicyLayout>
  );
}
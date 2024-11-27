// pages/privacy.js

import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <div className='dark:bg-[#09090B] dark:text-white/70' >
      <Head>
        <title  >Privacy Policy - Your Clothing Store</title>
        <meta name="description" content="Privacy policy for Your Clothing Store eCommerce website." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-lg dark:text-white/90 text-gray-700 mb-6">
          Welcome to Your Clothing Store! We value your privacy and are committed to protecting your personal information.
          This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our site or make a purchase.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold dark:text-white/90 text-gray-800">1. Information We Collect</h2>
            <p className="text-gray-700 dark:text-white/70">
              We collect various types of information to enhance your shopping experience, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information: Name, email address, phone number, billing and shipping address.</li>
              <li>Payment Information: Credit/debit card details processed securely through our payment partners.</li>
              <li>Account Information: Username, password, and preferences if you create an account.</li>
              <li>Automatic Data: Cookies, IP addresses, browser type, and device information used for analytics.</li>
              <li>Voluntary Information: Feedback, surveys, and customer support details you provide.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">2. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-white/70">
              We use the information collected for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfill your orders, including shipping and returns.</li>
              <li>To send you updates regarding your order status, promotions, and newsletters (you can opt-out anytime).</li>
              <li>To personalize your shopping experience and improve our website and services.</li>
              <li>To detect and prevent fraudulent activity and protect the security of our website.</li>
              <li>To comply with legal obligations and respond to law enforcement requests, if necessary.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">3. How We Share Your Information</h2>
            <p className="text-gray-700 dark:text-white/70">
              We may share your data with trusted third parties in the following scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Third-Party Service Providers:</strong> Payment processors, shipping companies, and analytics services.</li>
              <li><strong>Marketing Partners:</strong> We may share data for promotional purposes, but only with your consent.</li>
              <li><strong>Legal Compliance:</strong> We may share information to comply with laws, regulations, or court orders.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">4. Data Security</h2>
            <p className="text-gray-700 dark:text-white/70">
              We take the protection of your personal information seriously. We use encryption, secure servers, and other
              measures to protect your data. However, no system is 100% secure, and we cannot guarantee complete security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">5. Your Rights</h2>
            <p className="text-gray-700 dark:text-white/70">
              You have certain rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access & Rectification:</strong> You can access and update your information at any time.</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data in a machine-readable format.</li>
              <li><strong>Right to Erasure:</strong> You can request the deletion of your data under certain conditions.</li>
              <li><strong>Opt-Out:</strong> You can unsubscribe from marketing communications at any time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold dark:text-white/90 text-gray-800">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 dark:text-white/70">
              We use cookies and similar technologies to enhance your browsing experience. These help us analyze
              website traffic, personalize content, and deliver targeted ads. You can manage your cookie preferences in
              your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">7. Data Retention</h2>
            <p className="text-gray-700 dark:text-white/70">
              We retain your personal data as long as necessary to fulfill the purposes outlined in this policy, including
              legal or accounting requirements. Once no longer needed, we will securely delete your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">8. Minors</h2>
            <p className="text-gray-700 dark:text-white/70">
              Our services are not intended for minors under the age of 18. We do not knowingly collect personal data
              from children, and if we become aware of such data, we will take steps to remove it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">9. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-white/70">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the
              updated date. Please check periodically for updates.
            </p>
          </div>

        </section>
      </main>
    </div>
  )
}

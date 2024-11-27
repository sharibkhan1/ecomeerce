// pages/terms.js

import Head from 'next/head'

export default function TermsAndConditions() {
  return (
    <div className='dark:bg-[#09090B] dark:text-white/70'>
      <Head>
        <title>Terms and Conditions - Your Clothing Store</title>
        <meta name="description" content="Terms and conditions for Your Clothing Store eCommerce website." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12 ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-white/70">Terms and Conditions</h1>
        <p className="text-lg text-gray-700 mb-6 dark:text-white/70">
          Welcome to Your Clothing Store! By accessing and using our website, you agree to comply with the following terms
          and conditions. Please read them carefully.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">1. Introduction</h2>
            <p className="text-gray-700 dark:text-white/70">
              These terms and conditions govern your use of our website, including any purchases made through our online
              store. By using our services, you agree to be bound by these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">2. Use of Our Website</h2>
            <p className="text-gray-700 dark:text-white/70">
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engage in any activity that violates any laws or regulations.</li>
              <li>Interfere with or disrupt the functioning of the website.</li>
              <li>Upload or transmit harmful content such as viruses or malware.</li>
              <li>Access data or services not authorized for your use.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">3. Account Registration</h2>
            <p className="text-gray-700 dark:text-white/70">
              To make a purchase or access certain features, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information during registration.</li>
              <li>Maintain the confidentiality of your account and password.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">4. Orders and Payments</h2>
            <p className="text-gray-700 dark:text-white/70">
              When you place an order, you agree to pay the full amount for the items purchased, including taxes and shipping
              fees. All payments are processed through secure third-party payment gateways.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to cancel or refuse any order for various reasons.</li>
              <li>Orders are subject to availability, and we cannot guarantee stock levels.</li>
              <li>We accept multiple payment methods, including credit/debit cards and PayPal.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">5. Shipping and Delivery</h2>
            <p className="text-gray-700 dark:text-white/70">
              We will make every effort to process and ship your order in a timely manner. However, we cannot be held
              responsible for delays caused by external factors such as shipping carrier delays or natural disasters.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping costs are calculated at checkout based on your location.</li>
              <li>Delivery times may vary depending on your region and the shipping method chosen.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">6. Returns and Exchanges</h2>
            <p className="text-gray-700 dark:text-white/70">
              We accept returns and exchanges within a certain period after delivery, provided the items are in their
              original condition and packaging. Please refer to our <a href="/returns" className="text-blue-600">Return Policy</a> for
              detailed information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">7. Product Descriptions</h2>
            <p className="text-gray-700 dark:text-white/70">
              We strive to provide accurate descriptions of our products. However, we do not guarantee that the colors,
              features, or specifications on our website are fully accurate or complete. We reserve the right to correct
              any errors or inaccuracies at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">8. Privacy and Data Security</h2>
            <p className="text-gray-700 dark:text-white/70">
              We respect your privacy and are committed to protecting your personal information. Please refer to our
              <a href="/policy" className="text-blue-600"> Privacy Policy</a> for detailed information on how we handle your
              data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">9. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-white/70">
              To the fullest extent permitted by law, Your Clothing Store shall not be liable for any indirect, incidental,
              special, or consequential damages arising from the use or inability to use our services, products, or website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">10. Governing Law</h2>
            <p className="text-gray-700 dark:text-white/70">
              These Terms and Conditions are governed by the laws of the jurisdiction in which Your Clothing Store is
              registered. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts
              in that jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">11. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-white/70">
              We may update these terms and conditions from time to time. When changes occur, they will be posted on this page
              with an updated date. Please review this page regularly for any changes.
            </p>
          </div>

        </section>
      </main>
    </div>
  )
}

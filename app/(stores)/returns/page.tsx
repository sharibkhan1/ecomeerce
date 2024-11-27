// pages/returns.js

import Head from 'next/head'

export default function ReturnPolicy() {
  return (
    <div className='dark:bg-[#09090B] dark:text-white/70'>
      <Head>
        <title>Return Policy - Your Clothing Store</title>
        <meta name="description" content="Return policy for Your Clothing Store eCommerce website." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center  dark:text-white/90 text-gray-800 mb-6">Return Policy</h1>
        <p className="text-lg text-gray-700 dark:text-white/70 mb-6">
          We want you to be completely satisfied with your purchase from Your Clothing Store. If for any reason you are not
          satisfied, we accept returns under the conditions listed below.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">1. Eligibility for Returns</h2>
            <p className="text-gray-700 dark:text-white/70">
              To be eligible for a return, your item must meet the following criteria:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The item must be in its original condition, unused, and unworn.</li>
              <li>The item must be in its original packaging (if applicable).</li>
              <li>Return requests must be made within 7 days from the delivery date.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">2. How to Initiate a Return</h2>
            <p className="text-gray-700 dark:text-white/70">
              If you would like to return an item, please follow these steps:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact our customer service team at <span className="font-semibold">support@yourclothingstore.com</span> with your order number and reason for the return.</li>
              <li>Once your return request is approved, you will receive instructions on how to return the item(s).</li>
              <li>Return shipping is at your expense unless the item is defective or incorrect.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">3. Refunds</h2>
            <p className="text-gray-700 dark:text-white/70">
              Once your return is received and inspected, we will notify you via email. If your return is approved, we will
              process your refund to the original payment method. Refunds may take up to 7-10 business days to appear in your
              account, depending on your payment provider.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds will be issued for the cost of the product. Shipping costs are non-refundable unless the item was
                defective or sent in error.</li>
              <li>If you used a discount code during checkout, the refund will be based on the discounted price.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">4. Exchanges</h2>
            <p className="text-gray-700 dark:text-white/70">
              We do not offer direct exchanges. If you need a different size or color, please return the original item and
              place a new order for the desired item.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">5. Defective or Damaged Items</h2>
            <p className="text-gray-700 dark:text-white/70">
              If you receive an item that is defective or damaged, please contact us within 7 days of receiving the product.
              We will provide a return label at no cost to you and will issue a full refund or replacement.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To initiate a return for defective or damaged items, please email us at <span className="font-semibold">support@yourclothingstore.com</span> with a photo of the item and a description of the issue.</li>
              <li>In cases where a replacement is requested, we will ship a new item at no additional cost.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">6. Non-Returnable Items</h2>
            <p className="text-gray-700 dark:text-white/70">
              The following items are not eligible for return:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gift cards or vouchers.</li>
              <li>Underwear, socks, or any intimate apparel for hygiene reasons.</li>
              <li>Personalized or custom-made items.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">7. Return Shipping</h2>
            <p className="text-gray-700 dark:text-white/70">
              You are responsible for paying the return shipping costs unless the item is defective or incorrect. Return
              shipping costs are non-refundable, and we recommend using a trackable shipping service to ensure the return
              reaches us.
            </p>
          </div>

        </section>
      </main>
    </div>
  )
}

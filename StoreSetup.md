**UI DESIGN REQUIREMENTS**



- [ ] Product Listing / Shop Page
    - [ ] Grid or list of products (fetched from Printful, filtered as needed)
    - [ ] Product image, title, price, quick "Add to Cart" or "View Details" button
    - [ ] Filters (by category, size, color, etc. — optional)

- [ ] Product Detail Page
    - [ ] Large product images (mockups from Printful)
    - [ ] Product title, description, price
    - [ ] Size and color selectors (if applicable)
    - [ ] "Add to Cart" button
    - [ ] Stock/availability info (optional)
    - [ ] Social sharing (optional)

- [ ] Cart / Mini-Cart
    - [ ] List of items added to cart
    - [ ] Quantity controls, remove item, subtotal
    - [ ] "Checkout" button

- [ ] Checkout Page
    - [ ] Customer information (name, email, shipping address)
    - [ ] Order summary
    - [ ] Payment section (Square payment form or redirect)
    - [ ] "Place Order" button
    - [ ] Error and success messages

- [ ] Order Confirmation Page
    - [ ] Thank you message
    - [ ] Order summary and confirmation number
    - [ ] Next steps (e.g., "You'll receive an email when your order ships")

- [ ] Order Status / Tracking Page (optional)
    - [ ] Allow customers to check the status of their order (if you store Printful order IDs/statuses)

- [ ] Account / Login / Register (optional)
    - [ ] For repeat customers, order history, etc.

- [ ] Admin Dashboard (optional, for you)
    - [ ] View/manage orders, sync with Printful, see payment status, etc.

- [ ] Other Pages
    - [ ] About page
    - [ ] Contact page (with form)
    - [ ] FAQ / Help
    - [ ] Policies (shipping, returns, privacy, etc.)

**Component List:**
- [ ] ProductCard
- [ ] ProductGrid
- [ ] ProductDetail
- [ ] CartDrawer/Modal
- [ ] CheckoutForm
- [ ] OrderSummary
- [ ] Notification/Toast system




# Store Setup Checklist: Square Payments + Printful Fulfillment (Square-Managed Catalog)

- [ ] **Set up your Square Online Store or Custom Website**
    - [ ] Build your site or use Square Online Store
    - [ ] Set up your store branding, domain, and basic settings

- [ ] **Manage Products and Prices in Square**
    - [ ] Add all products, descriptions, images, and retail prices in your Square dashboard
    - [ ] Use Square's API to fetch product catalog and prices for your website (if custom)
    - [ ] Keep product info up to date in Square

- [ ] **Set up Square Payments**
    - [ ] Enable Square as your payment processor
    - [ ] Test payment flow to ensure funds go to your Square balance
    - [ ] Order and activate your Square Card (debit card)

- [ ] **Set up Printful Account for Fulfillment**
    - [ ] Create a Printful account (if you haven't already)
    - [ ] Add your Square Card as a payment method in Printful (once it arrives)
    - [ ] (Optional) Set up Printful product templates for fulfillment reference

- [ ] **Automate Order Fulfillment**
    - [ ] Set up a webhook or backend process to listen for paid orders from Square
    - [ ] On payment confirmation, gather order details (customer info, products, shipping)
    - [ ] Call the Printful API to create/fulfill the order (using product info from Square and fulfillment info from Printful)
    - [ ] Store Printful order IDs and statuses for tracking

- [ ] **Test the Full Flow**
    - [ ] Place a test order as a customer
    - [ ] Confirm payment is received in Square
    - [ ] Confirm Printful order is created and charged to your Square Card
    - [ ] Track order status and delivery

- [ ] **Launch and Monitor**
    - [ ] Announce your store launch
    - [ ] Monitor orders, payments, and fulfillment
    - [ ] Adjust automation or product selection as needed



**Order Tracking Setup**

- [ ] Collect customer email at checkout
- [ ] When creating the order in Printful (via API or integration), include the customer's email address
- [ ] Enable Printful's customer notifications (Printful Dashboard → Settings → Orders → Customer notifications)
- [ ] Ensure Printful sends shipping confirmation emails with tracking links to customers
- [ ] (Optional) Fetch tracking info from Printful API and send your own shipping confirmation email with the tracking link
- [ ] (Optional) Display a "Track Your Order" link on your order confirmation page, using the tracking URL from Printful
- [ ] No customer account or login required—customers receive tracking via email

**Order History Access via OTP (One-Time Password)**

- [ ] Create an "Order Lookup" or "Track My Order" page on your site
- [ ] Customer enters their email address on the page
- [ ] Backend verifies the email exists for an order in your database
- [ ] Generate a secure, random OTP code (e.g., 6 digits)
- [ ] Email the OTP code to the customer's email address
- [ ] Customer enters the OTP code on the site
- [ ] Backend verifies the OTP and email combination
- [ ] If valid, display the customer's order history/details
- [ ] Expire OTPs after a short time (e.g., 10 minutes) and allow only one use
- [ ] (Optional) Rate-limit OTP requests to prevent abuse
- [ ] Never show order details without successful OTP verification
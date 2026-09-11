# Customer accounts and My Beats

## Goal
Let customers create an account, sign in from any device, and access purchased beats associated with their checkout email.

## Build
- Add email/password and Google sign-in with a public account page.
- Save each customer’s display name in a protected profile.
- Add a protected **My Beats** page showing purchased beat, licence, purchase date, and download access.
- Add account controls to the site header and a sign-in prompt after successful checkout.
- Prefill checkout name and email for signed-in customers.

## Purchase matching
- Create profiles and purchase-entitlement records in connected Cloud.
- Protect all customer data so each signed-in user can only read their own profile and purchases.
- Match existing and future purchases by normalized checkout email when the customer signs in.
- Keep the six existing public preview links unchanged; purchased download links are recorded separately from previews.

## Technical details
- Use the existing project authentication integration and protected route layout.
- Add a database migration with explicit grants, row-level security, profile creation, and email-claim logic.
- Use authenticated server functions for customer-library reads and profile updates.
- Keep payment checkout on the currently wired payment endpoint; its confirmed-order writer must populate purchase entitlements for automatic delivery.
- Verify sign-up, sign-in, sign-out, checkout prefilling, protected navigation, and My Beats across desktop and mobile.

## Dependency
Automatic libraries require the payment confirmation process to write each completed purchase into the new entitlement table. The account experience will handle records already present there; if the existing payment webhook lives outside this repository, its small write step must be updated there as well.

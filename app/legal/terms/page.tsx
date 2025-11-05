import { Metadata } from 'next';

// Metadata for the terms of service page. This helps Next.js set the title
// when rendering the page on the client and server. See docs:
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: 'Terms of Service',
};

/**
 * Terms of Service page
 *
 * This component renders the terms of service for BGConnects. The content
 * comes from the original MDX file but has been converted into plain JSX
 * to avoid the need for MDX-related dependencies. If you need to update
 * the text, edit the JSX below. Headings and paragraphs are styled using
 * Tailwind classes for readability and responsiveness.
 */
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p>
        Welcome to <strong>BGConnects</strong>. These terms of service outline the
        rules and regulations for using our marketplace. By accessing this
        website we assume you accept these terms and conditions. Do not
        continue to use BGConnects if you do not agree to all of the terms and
        conditions stated on this page.
      </p>
      <h2 className="text-2xl font-semibold">Services</h2>
      <p>
        BGConnects acts as a venue to allow sellers to offer services to
        buyers. We are not responsible for the quality, timing or legality of
        services provided. Buyers are responsible for communicating with
        sellers regarding scheduling, expectations and any issues that arise.
      </p>
      <h2 className="text-2xl font-semibold">Payments</h2>
      <p>
        Payments are processed through Stripe. A platform fee of 3% is added
        to each transaction to support BGConnects. Payments are held until a
        booking is completed. Refunds may be issued at the seller’s
        discretion via the Stripe dashboard.
      </p>
      <h2 className="text-2xl font-semibold">Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site
        constitutes acceptance of any new terms.
      </p>
    </div>
  );
}
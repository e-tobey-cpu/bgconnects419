import { Metadata } from 'next';

// Metadata for the privacy policy page. This ensures a descriptive title
// appears in the browser tab when this page is loaded.
export const metadata: Metadata = {
  title: 'Privacy Policy',
};

/**
 * Privacy Policy page
 *
 * This component renders the privacy policy for BGConnects. It replaces
 * the original MDX version to avoid MDX dependencies. To update the
 * policy text, edit the JSX below. Headings and paragraphs are styled
 * using Tailwind classes for consistent spacing and typography.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This privacy policy explains how
        BGConnects collects, uses and safeguards your information.
      </p>
      <h2 className="text-2xl font-semibold">Information we collect</h2>
      <p>
        We collect information you provide directly such as your email
        address, name and booking details. Payments are handled by Stripe and
        we do not store credit card details.
      </p>
      <h2 className="text-2xl font-semibold">How we use information</h2>
      <p>
        Information is used to facilitate bookings, process payments and
        send notifications. We do not sell or share your personal data with
        third parties except as required to process transactions or comply
        with law.
      </p>
      <h2 className="text-2xl font-semibold">Cookies</h2>
      <p>
        We use cookies to maintain sessions and preferences. You may disable
        cookies in your browser but this may affect site functionality.
      </p>
      <h2 className="text-2xl font-semibold">Changes</h2>
      <p>
        We may update this policy occasionally. We will notify you of any
        significant changes.
      </p>
    </div>
  );
}
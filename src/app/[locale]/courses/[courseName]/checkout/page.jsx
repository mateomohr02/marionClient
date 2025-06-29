import { getTranslations } from 'next-intl/server';
import CheckoutPage from "@/components/pages/checkoutPage";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Courses.Detail.Checkout.Title'),
    description: t('Courses.Detail.Checkout.Description'),
  };
}

export default function Page() {
  return <CheckoutPage />;
}

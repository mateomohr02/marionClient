import { getTranslations } from 'next-intl/server';
import NotFound from "@/components/NotFound"

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('NotFound.Title'),
    description: t('NotFound.Description'),
  };
}

export default function NotFoundPage() {
  return <NotFound/>;
}


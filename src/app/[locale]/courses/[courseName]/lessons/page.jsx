import { getTranslations } from 'next-intl/server';
import Lessons from "@/components/pages/lessons";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Lessons.Page.Title'),
    description: t('Lessons.Page.Description'),
  };
}

export default function Page() {
  return <Lessons />;
}

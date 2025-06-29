import { getTranslations } from 'next-intl/server';
import Forum from "@/components/pages/forum";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Lessons.Forum.Title'),
    description: t('Lessons.Forum.Description'),
  };
}

export default function Page() {
  return <Forum />;
}

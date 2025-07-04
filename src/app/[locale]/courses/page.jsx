import { getTranslations } from 'next-intl/server';
import Courses from "@/components/pages/courses";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Courses.Page.Title'),
    description: t('Courses.Page.Description'),
  };
}

export default function Page() {
  return <Courses />;
}

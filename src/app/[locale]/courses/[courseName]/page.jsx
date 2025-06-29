import { getTranslations } from 'next-intl/server';
import CourseDetail from "@/components/pages/courseDetail";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Courses.Detail.Title'),
    description: t('Courses.Detail.Description'),
  };
}

export default function Page() {
  return <CourseDetail />;
}

import { getTranslations } from 'next-intl/server';
import ForumPostDetailPage from "@/components/pages/forumPostDetailPage";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Lessons.Forum.Detail.Title'),
    description: t('Lessons.Forum.Detail.Description'),
  };
}

export default function Page() {
  return <ForumPostDetailPage />;
}

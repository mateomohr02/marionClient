import { getTranslations } from 'next-intl/server';
import PostDetailPage from "@/components/pages/postDetailPage";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Blog.Detail.Title'),
    description: t('Blog.Detail.Description'),
  };
}

export default function Page() {
  return <PostDetailPage />;
}

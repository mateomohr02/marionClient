import { getTranslations } from 'next-intl/server';
import Community from "@/components/pages/community";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Blog.Page.Title'),
    description: t('Blog.Page.Description'),
  };
}

export default function Page() {
  return <Community />;
}

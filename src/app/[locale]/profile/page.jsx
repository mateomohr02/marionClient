import { getTranslations } from 'next-intl/server';
import Profile from "@/components/pages/profile";

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Profile.Page.Title'),
    description: t('Profile.Page.Description'),
  };
}

export default function Page() {
  return <Profile />;
}

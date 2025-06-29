import { getTranslations } from 'next-intl/server';
import Register from '@/components/Register'

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Profile.Register.Title'),
    description: t('Profile.Register.Description'),
  };
}

const page = () => {
  return (
    <div className='min-h-[calc(100vh-8rem)]'>
        <Register/>
    </div>
  )
}

export default page
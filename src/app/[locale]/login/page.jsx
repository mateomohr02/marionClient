import { getTranslations } from 'next-intl/server';
import Login from "@/components/Login"

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });

  return {
    title: t('Profile.Login.Title'),
    description: t('Profile.Login.Description'),
  };
}


const page = () => {
  return (
    <div className='min-h-[calc(100vh-8rem)]'>
        <Login/>
    </div>
  )
}

export default page
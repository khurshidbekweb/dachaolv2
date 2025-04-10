import { useTranslation } from 'next-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function TopBannerService() {
  const { t } = useTranslation();

  const tariffs = [
    {
      id: '1_day',
      features: ['short_term', 'new_cottages', 'promotions']
    },
    {
      id: '3_days',
      features: ['weekend_promo', 'continuous_visibility']
    },
    {
      id: '1_week',
      features: ['long_term', 'daily_clients', 'cost_effective']
    },
    {
      id: '1_month',
      features: ['most_effective', 'low_daily_cost', 'special_bonus']
    }
  ];

  const faqItems = [
    { id: 'visibility' },
    { id: 'refund' },
    { id: 'multiple' }
  ];

  const targetItems = [
    'quick_rental',
    'seasonal_demand',
    'new_owners'
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{t('topBanner_title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('topBanner_description')}
        </p>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tariffs.map((tariff) => (
          <Card key={tariff.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">
                {t(`tariff_${tariff.id}_title`)}
              </CardTitle>
              <CardDescription>
                {t(`tariff_${tariff.id}_duration`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                {t(`tariff_${tariff.id}_price`)}
              </div>
              <ul className="space-y-2 mb-6">                
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t(`tariff_${tariff.id}_feature1`)}</span>
                  </li>     
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t(`tariff_${tariff.id}_feature2`)}</span>
                  </li> 
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t(`tariff_${tariff.id}_feature3`)}</span>
                  </li>            
              </ul>
              <Button className="w-full">
                {t('select_button')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>{t('faq_title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id}>
                <h3 className="font-medium">❓ {t(`faq_${item.id}_question`)}</h3>
                <p className="text-muted-foreground mt-2">
                  → {t(`faq_${item.id}_answer`)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('target_title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {targetItems.map((item) => (
              <div key={item} className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <span>{t(`target_${item}`)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">{t('promo_title')}</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          {t('promo_description')}
        </p>
        <Button size="lg">
          {t('cta_button')}
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>{t('contact_email')}</p>
        <p>{t('contact_phone')}</p>
      </div>
    </div>
  );
}
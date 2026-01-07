'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Can I cancel or reschedule my seva booking?',
    answer:
      'Yes, you can reschedule your seva up to 24 hours before the scheduled time by contacting the temple office. Cancellations are accepted with a minimum 48-hour notice. Please call us at +91 (555) 123-4567 for assistance.',
  },
  {
    question: 'What is the dress code for attending sevas?',
    answer:
      'Traditional Indian attire is recommended. Men should wear dhoti-kurta or shirt-pants with angavastram. Women should wear saree, salwar kameez, or churidar. Please avoid shorts, sleeveless tops, and leather items inside the temple.',
  },
  {
    question: 'Will I receive prasadam after the seva?',
    answer:
      'Yes, blessed prasadam is distributed to all participants after the completion of every seva. The type of prasadam varies based on the seva - it could be modaks, panchamrit, fruits, or specially prepared temple offerings.',
  },
  {
    question: 'Can family members participate in the seva?',
    answer:
      'Absolutely! Family participation is encouraged and considered highly auspicious. Please inform us about the number of family members during booking so we can make proper arrangements. Children are welcome under adult supervision.',
  },
  {
    question: 'Is advance booking mandatory?',
    answer:
      'For special sevas like Sahasranama Archana, Homam, and festival celebrations, advance booking is mandatory. For daily sevas like regular Archana and Abhishekam, walk-in participation is allowed subject to availability.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, UPI payments, bank transfers, and online donations through our website. You can also sponsor sevas through check or demand draft payable to "Shri Vighneshwara Swamy Temple Trust".',
  },
  {
    question: 'Are there any special sevas for specific occasions?',
    answer:
      'Yes, we offer customized sevas for birthdays, anniversaries, house warming (Grihapravesh), business inauguration, and other special occasions. Please contact our office to discuss your requirements and we\'ll arrange appropriate rituals.',
  },
  {
    question: 'Can I participate in the actual ritual or just observe?',
    answer:
      'Participation level varies by seva type. For Archana and some pujas, you can actively participate under priest guidance. For technical rituals like Homam, observation is recommended unless you have prior experience. Our priests will guide you appropriately.',
  },
];

export default function SevasFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-12 mb-12'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-black text-fg mb-3'>
            {t('sevas.faq.title')}
          </h2>
          <p className='text-muted text-lg'>
            {t('sevas.faq.subtitle')}
          </p>
        </div>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-6 py-4 flex items-center justify-between text-left hover:bg-orange-50/50 transition-colors'
                aria-expanded={openIndex === index}>
                <span className='font-bold text-fg pr-4'>{faq.question}</span>
                <span
                  className={`material-symbols-outlined text-orange-500 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                  expand_more
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                <div className='px-6 pb-4 pt-2 text-muted leading-relaxed border-t border-border bg-orange-50/30'>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Footer */}
        <div className='mt-10 text-center p-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200'>
          <p className='text-fg mb-3'>
            <span className='font-bold'>{t('sevas.faq.stillHaveQuestions')}</span>
          </p>
          <p className='text-muted mb-4'>{t('sevas.faq.contactMessage')}</p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
            <a
              href='tel:+915551234567'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors'>
              <span className='material-symbols-outlined text-lg'>call</span>
              <span>{t('sevas.faq.call')} +91 (555) 123-4567</span>
            </a>
            <a
              href='/contact-us'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border text-fg font-medium rounded-lg hover:bg-orange-50 transition-colors'>
              <span className='material-symbols-outlined text-lg'>email</span>
              <span>{t('sevas.faq.contactUs')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

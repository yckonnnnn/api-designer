import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface FaqSectionProps {
  onOpenApiKey: () => void;
  onOpenDownload?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const { language } = useLanguage();
  const t = translations[language].faq;

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const question = language === 'en' && faq.questionEn ? faq.questionEn : faq.question;
            const answer = language === 'en' && faq.answerEn ? faq.answerEn : faq.answer;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-neutral-200 overflow-hidden transition-all bg-white shadow-2xs hover:border-neutral-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-neutral-50/60 transition-colors cursor-pointer"
                >
                  <span className="text-base font-bold text-neutral-900">
                    {question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-orange-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100/80 bg-neutral-50/40">
                    <p className="pt-4">{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

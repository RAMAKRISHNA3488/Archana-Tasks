import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { CONTACT_FAQS } from '../../data/contactData';
import './ContactFAQ.css';

export function ContactFAQ() {
  const [openFaqId, setOpenFaqId] = useState(CONTACT_FAQS[0].id);

  const toggleFaq = (id) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="contact-faq-card">
      <div className="faq-header">
        <div className="faq-header-icon">
          <HelpCircle size={22} />
        </div>
        <h3 className="faq-title">Frequently Asked Questions</h3>
      </div>

      <div className="faq-accordion-list">
        {CONTACT_FAQS.map(faq => {
          const isOpen = openFaqId === faq.id;
          return (
            <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="faq-accordion-button"
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-toggle-icon">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-panel">
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactFAQ;

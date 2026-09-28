import React, { useState } from 'react';
import type { Business } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { formatTelLink, formatWhatsAppLink } from '../../lib/business';

interface AppointmentSectionProps {
  business: Business;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ business }) => {
  const { appointment, contact } = business;

  const targetEmail = appointment.recipientEmail || contact.notificationEmail || contact.email;
  const isConfiguredEmail =
    Boolean(targetEmail) &&
    !targetEmail.includes('your-clinic-email') &&
    !targetEmail.endsWith('.example');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: appointment.servicesOffered[0] || '',
    preferredDate: '',
    preferredTimeSlot: appointment.timeSlots[0] || '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sentToEmail, setSentToEmail] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    // If template is still using default placeholder email, simulate success smoothly
    if (!isConfiguredEmail) {
      setTimeout(() => {
        setSubmitting(false);
        setSentToEmail('');
        setSubmitted(true);
      }, 450);
      return;
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail.trim())}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Patient Consultation: ${formData.fullName} (${business.name})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email,
          'Full Name': formData.fullName,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Selected Service': formData.serviceInterest,
          'Preferred Date': formData.preferredDate || 'Flexible / Earliest available',
          'Preferred Time Slot': formData.preferredTimeSlot || 'Any time',
          'Patient Notes': formData.message || 'No additional notes provided',
          'Submitted At': new Date().toLocaleString(),
        }),
      });

      const data = await response.json();
      if (response.ok && (data.success === 'true' || data.success === true)) {
        setSentToEmail(targetEmail.trim());
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.message || 'Unable to submit your inquiry at this moment. Please call our concierge desk directly.'
        );
      }
    } catch {
      setErrorMessage(
        'Network error while transmitting your request. Please check your internet connection or call our clinic directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorMessage('');
    setSentToEmail('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceInterest: appointment.servicesOffered[0] || '',
      preferredDate: '',
      preferredTimeSlot: appointment.timeSlots[0] || '',
      message: '',
    });
  };

  return (
    <section id="appointment" className="py-20 sm:py-28 lg:py-32 bg-[#141716] text-[#F7F6F2] border-t border-white/10 overflow-hidden relative">
      {/* Background architectural fine grid dots matching menu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(184, 238, 232, 0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Direct Concierge Channels */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" delay={60}>
              <SectionHeading
                eyebrow="Consultation Reservation"
                headline={appointment.title}
                description={appointment.description}
                dark
                size="lg"
              />
            </Reveal>

            {/* Direct Concierge Callout */}
            <Reveal direction="up" delay={160}>
              <div className="border border-white/10 bg-[#1A1D1C] p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-[#B8EEE8]">
                    <IconMark name="phone" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E9790]">
                      Direct Telephone
                    </p>
                    <p className="text-sm font-display font-medium text-white">
                      Concierge Desk
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#9AA29D] leading-relaxed font-normal">
                  {appointment.phonePrompt}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    href={formatTelLink(contact.phone)}
                    variant="aqua"
                    size="sm"
                    fullWidth
                    iconLeft={<IconMark name="phone" className="w-3.5 h-3.5" />}
                  >
                    {contact.displayPhone}
                  </Button>

                  {contact.whatsappNumber && (
                    <Button
                      href={formatWhatsAppLink(
                        contact.whatsappNumber,
                        `Hello ${business.name}, I would like to inquire about booking a consultation.`
                      )}
                      variant="outline"
                      size="sm"
                      fullWidth
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-white/20 text-[#DFE4DC] hover:border-white/40 hover:bg-white/10"
                      iconLeft={<IconMark name="whatsapp" className="w-3.5 h-3.5 text-[#B8EEE8]" />}
                    >
                      WhatsApp
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Hours & Reassurance */}
            <Reveal direction="up" delay={240}>
              <div className="space-y-2.5 text-xs text-[#8E9790]">
                <div className="flex items-center gap-2.5">
                  <IconMark name="clock" className="w-3.5 h-3.5 text-[#B8EEE8]" />
                  <span>Direct response typically within 2-4 clinical hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <IconMark name="shield-check" className="w-3.5 h-3.5 text-[#B8EEE8]" />
                  <span>Private consultation with complete patient confidentiality</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Appointment Form Frame */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={120}>
              <div className="border border-white/10 bg-[#181B1A] p-6 sm:p-10 rounded-sm relative">
                {/* Architectural corner marks */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#B8EEE8]/40" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#B8EEE8]/40" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#B8EEE8]/40" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#B8EEE8]/40" />

                {submitted ? (
                  /* Success State */
                  <div className="py-8 space-y-6 text-center animate-in fade-in duration-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#B8EEE8]/30 bg-[#B8EEE8]/10 text-[#B8EEE8]">
                      <IconMark name="badge-check" className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-medium text-white">
                        {sentToEmail ? 'Inquiry Transmitted Successfully' : 'Inquiry Received (Demo Mode)'}
                      </h3>
                      <p className="text-sm text-[#9AA29D] max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-medium text-white">{formData.fullName || 'Valued Patient'}</span>. Your requested appointment preferences have been recorded.
                        {sentToEmail
                          ? ' An email notification has been dispatched to our clinic concierge.'
                          : ' Our concierge team will review your requested date and contact you shortly.'}
                      </p>
                    </div>

                    {sentToEmail ? (
                      <div className="rounded-sm bg-white/5 p-4 text-xs text-[#B8EEE8] border border-white/10 max-w-lg mx-auto flex items-center justify-center gap-2">
                        <IconMark name="shield-check" className="w-4 h-4 text-[#B8EEE8] shrink-0" />
                        <span>Dispatched to clinic inbox: <strong>{sentToEmail}</strong></span>
                      </div>
                    ) : (
                      <div className="rounded-sm bg-white/5 p-4 text-xs text-[#8E9790] border border-white/10 max-w-lg mx-auto text-left space-y-1">
                        <p className="font-mono uppercase tracking-wider text-[11px] text-white">Template Notice:</p>
                        <p>
                          To route these inquiries directly to your real Gmail, simply set <code className="text-[#B8EEE8] bg-white/10 px-1 py-0.5 rounded">"recipientEmail"</code> in <code className="text-white bg-white/10 px-1 py-0.5 rounded">src/data/demo-business.json</code>.
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-[#DFE4DC] hover:border-white/40 hover:bg-white/10"
                        onClick={resetForm}
                      >
                        Submit Another Inquiry
                      </Button>
                      {contact.whatsappNumber && (
                        <Button
                          href={formatWhatsAppLink(
                            contact.whatsappNumber,
                            `Hello ${business.name}, I just submitted a consultation request for ${formData.fullName}.`
                          )}
                          variant="aqua"
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          iconLeft={<IconMark name="whatsapp" className="w-3.5 h-3.5" />}
                        >
                          Chat on WhatsApp
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Interactive Booking Form with Smooth Focus Effects */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-display text-2xl font-medium text-white">
                        Request Consultation
                      </h3>
                      <p className="text-xs text-[#8E9790] mt-1">
                        Please indicate your scheduling preferences and our clinical coordinator will contact you.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="rounded-sm bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-200 flex items-start gap-2.5">
                        <IconMark name="info" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{errorMessage}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="fullName"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Sunita Rao"
                          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#B8EEE8] focus:bg-white/10 focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="phone"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#B8EEE8] focus:bg-white/10 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. sunita@example.com"
                          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#B8EEE8] focus:bg-white/10 focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Service Interest */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="serviceInterest"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Service Interest
                        </label>
                        <select
                          id="serviceInterest"
                          name="serviceInterest"
                          value={formData.serviceInterest}
                          onChange={handleChange}
                          className="w-full rounded-sm border border-white/15 bg-[#1F2321] px-4 py-2.5 text-sm text-white focus:border-[#B8EEE8] focus:outline-none transition-all duration-200 cursor-pointer"
                        >
                          {appointment.servicesOffered.map((service, i) => (
                            <option key={i} value={service} className="bg-[#1F2321] text-white">
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="preferredDate"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-[#B8EEE8] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Preferred Time of Day */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="preferredTimeSlot"
                          className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                        >
                          Preferred Time Slot
                        </label>
                        <select
                          id="preferredTimeSlot"
                          name="preferredTimeSlot"
                          value={formData.preferredTimeSlot}
                          onChange={handleChange}
                          className="w-full rounded-sm border border-white/15 bg-[#1F2321] px-4 py-2.5 text-sm text-white focus:border-[#B8EEE8] focus:outline-none transition-all duration-200 cursor-pointer"
                        >
                          {appointment.timeSlots.map((slot, i) => (
                            <option key={i} value={slot} className="bg-[#1F2321] text-white">
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-[11px] font-mono uppercase tracking-wider text-[#DFE4DC]"
                      >
                        Notes or Specific Clinical Concerns (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share any past dental experiences, apprehensions, or specific symptoms..."
                        className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#B8EEE8] focus:bg-white/10 focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="aqua"
                      size="lg"
                      fullWidth
                      disabled={submitting}
                      className="group"
                      iconRight={
                        <IconMark
                          name="arrow-right"
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      }
                    >
                      {submitting ? 'Transmitting Request...' : 'Submit Consultation Request'}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Navigation 
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const ContactPage: React.FC = () => {
  const { hospitalInfo, departments, addContactMessage } = useHospital();
  const HOSPITAL_INFO = hospitalInfo;
  const DEPARTMENTS = departments;


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Hospital Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    addContactMessage({
      name,
      phone,
      email,
      subject,
      message,
    });
    setSubmitted(true);
  };


  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero Header */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            CONNECT WITH US
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Contact & Campus Directions
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Reach K.A. Busia Memorial Hospital (KA Busia Hospital) on Hospital Road, Bogoso, Western Region, Ghana. 24/7 emergency dispatch and outpatient assistance.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hospital Helpline Banner */}
          <div className="mb-10 p-5 rounded-2xl bg-[#E7F5F3] border border-[#2F8F83]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#075E54] text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172321] font-heading">
                  Hospital Direct Telephone Helpline
                </h3>
                <p className="text-xs text-[#64736F]">
                  For consultations, patient inquiries, or immediate hospital assistance, reach our team directly:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`}
                className="px-5 py-2.5 bg-[#075E54] hover:bg-[#05453E] text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 font-mono"
              >
                <Phone className="w-4 h-4 text-[#D6A84F]" />
                <span>Call {HOSPITAL_INFO.contacts.generalPhone}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 5 cols: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Address Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#075E54]">
                  <MapPin className="w-4 h-4 text-[#D6A84F]" />
                  <span>Hospital Campus</span>
                </div>
                <h3 className="text-lg font-bold text-[#172321] font-heading">
                  {HOSPITAL_INFO.name}
                </h3>
                <p className="text-xs text-[#64736F] leading-relaxed">
                  {HOSPITAL_INFO.contacts.addressPlaceholder}
                </p>
                <div className="pt-2 border-t border-[#E1EBE7] flex items-center justify-between text-xs">
                  <span className="text-[#64736F]">GhanaPost GPS:</span>
                  <span className="font-mono font-bold text-[#075E54]">{HOSPITAL_INFO.contacts.digitalAddress}</span>
                </div>
              </div>

              {/* Telephone & Email Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm space-y-4 text-xs">
                <div>
                  <span className="text-[#64736F] block">Hospital Telephone Enquiries:</span>
                  <a href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`} className="text-sm font-bold text-[#075E54] hover:underline font-mono">
                    {HOSPITAL_INFO.contacts.generalPhone}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#E1EBE7]">
                  <span className="text-[#64736F] block">Outpatient Bookings & Enquiries:</span>
                  <a href={`mailto:${HOSPITAL_INFO.contacts.appointmentsEmail}`} className="text-[#172321] hover:underline font-semibold">
                    {HOSPITAL_INFO.contacts.appointmentsEmail}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#E1EBE7]">
                  <span className="text-[#64736F] block">General Administration Email:</span>
                  <a href={`mailto:${HOSPITAL_INFO.contacts.email}`} className="text-[#172321] hover:underline font-semibold">
                    {HOSPITAL_INFO.contacts.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#075E54] font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#D6A84F]" />
                  <span>Clinical Hours</span>
                </div>
                <div className="space-y-2 text-[#172321]">
                  <div className="flex justify-between border-b border-[#E1EBE7] pb-1.5">
                    <span className="text-[#64736F]">Emergency & Trauma:</span>
                    <span className="font-bold text-[#075E54]">24 Hours / 7 Days</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E1EBE7] pb-1.5">
                    <span className="text-[#64736F]">Hospital Pharmacy:</span>
                    <span className="font-bold text-[#075E54]">24 Hours Daily</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E1EBE7] pb-1.5">
                    <span className="text-[#64736F]">Diagnostic Laboratory:</span>
                    <span className="font-bold text-[#075E54]">24 Hours Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64736F]">General Outpatient (OPD):</span>
                    <span className="font-semibold text-right max-w-[180px]">{HOSPITAL_INFO.hours.outpatient}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 7 cols: Interactive Form & Map Embed */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E1EBE7] shadow-sm">
                <h3 className="text-xl font-bold text-[#172321] font-heading mb-1">
                  Send a Message to Administration
                </h3>
                <p className="text-xs text-[#64736F] mb-6">
                  For administrative matters, compliments, billing questions, or feedback, send us a secure message.
                </p>

                {submitted ? (
                  <div className="p-6 bg-[#E7F5F3] border border-[#2F8F83]/30 rounded-2xl text-center space-y-3 animate-in zoom-in-95">
                    <CheckCircle2 className="w-12 h-12 text-[#075E54] mx-auto" />
                    <h4 className="text-lg font-bold text-[#075E54]">Message Sent Successfully</h4>
                    <p className="text-xs text-[#172321] max-w-md mx-auto">
                      Thank you for contacting K.A. Busia Memorial Hospital. Our patient relations office will review your message and reply via telephone or email.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#075E54] font-semibold underline mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kwame Mensah"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0244 123 456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. kwame.mensah@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Subject / Department
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                        >
                          <option>General Hospital Inquiry</option>
                          <option>Outpatient Appointments & Inquiries</option>
                          <option>Maternal & Child Health Wing</option>
                          <option>Laboratory or Radiology Records</option>
                          <option>NHIS Claims & Billing Support</option>
                          <option>Community Health Outreach Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172321] mb-1">
                        Your Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Official Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Map Embed Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#075E54]">
                    <Navigation className="w-4 h-4 text-[#D6A84F]" />
                    <span>Location Map & Campus Directions</span>
                  </div>
                  <span className="text-[11px] text-[#64736F]">Interactive Preview</span>
                </div>

                <div className="h-64 rounded-2xl bg-[#E7F5F3] border border-[#2F8F83]/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-3 relative">
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#075E54] shadow-md flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-[#075E54]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#172321]">{HOSPITAL_INFO.name}</h4>
                    <p className="text-xs text-[#64736F] max-w-sm mt-0.5">
                      {HOSPITAL_INFO.contacts.addressPlaceholder}
                    </p>
                  </div>
                  <div className="inline-block px-3 py-1 bg-white rounded-lg text-xs font-mono font-bold text-[#075E54] border border-[#E1EBE7]">
                    GPS: {HOSPITAL_INFO.contacts.digitalAddress}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64736F]">
                  <span>Campus includes free visitor parking and ambulance ramp access.</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bogoso,+Tarkwa,+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#075E54] font-bold hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Department Contact Extensions Table */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E1EBE7] shadow-sm">
            <h3 className="text-lg font-bold text-[#172321] font-heading mb-4">
              Department Direct Contact Extensions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E1EBE7] text-[#075E54] font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Department</th>
                    <th className="pb-3 px-4">Campus Location</th>
                    <th className="pb-3 px-4">Operating Hours</th>
                    <th className="pb-3 pl-4">Direct Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1EBE7]">
                  {DEPARTMENTS.slice(0, 7).map((d) => (
                    <tr key={d.id} className="hover:bg-[#F7FAF8]">
                      <td className="py-3 pr-4 font-semibold text-[#172321]">{d.name}</td>
                      <td className="py-3 px-4 text-[#64736F]">{d.location}</td>
                      <td className="py-3 px-4 text-[#64736F]">{d.hours}</td>
                      <td className="py-3 pl-4 font-mono text-[#075E54]">{HOSPITAL_INFO.contacts.generalPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

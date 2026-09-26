import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDepartmentId?: string;
  preselectedDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDepartmentId,
  preselectedDoctorId,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [department, setDepartment] = useState(preselectedDepartmentId || 'opd');
  const [doctor, setDoctor] = useState(preselectedDoctorId || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (8:00 AM – 11:30 AM)');
  const [reason, setReason] = useState('Routine Check-up / Consultation');
  const [message, setMessage] = useState('');
  const [hasInsurance, setHasInsurance] = useState('NHIS');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone Number is required so our clinic can call you.';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please provide a valid phone number (e.g. 0244 123 456).';
    }
    if (emailAddress && !/\S+@\S+\.\S+/.test(emailAddress)) {
      errs.emailAddress = 'Please enter a valid email address.';
    }
    if (!date) {
      errs.date = 'Please pick a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomCode = 'KAB-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(randomCode);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setDate('');
    setMessage('');
    setErrors({});
    onClose();
  };

  // Filter available doctors for the chosen department
  const filteredDoctors = DOCTORS.filter(
    (doc) => !department || doc.departmentId === department
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E1EBE7] my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#075E54] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close appointment form"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D6A84F] flex items-center justify-center text-[#172321]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                Schedule Your Visit
              </h2>
              <p className="text-xs sm:text-sm text-[#E1EBE7] mt-0.5">
                {HOSPITAL_INFO.name} • Outpatient & Specialty Care
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#E7F5F3] text-[#075E54] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#172321] font-heading">
                Appointment Request Received
              </h3>
              <p className="text-sm text-[#64736F] max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your request has been queued at our clinical scheduling desk.
              </p>

              <div className="bg-[#F7FAF8] border border-[#E1EBE7] rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#E1EBE7]">
                  <span className="text-[#64736F]">Reference Number:</span>
                  <span className="font-mono font-bold text-sm text-[#075E54]">{referenceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64736F]">Department:</span>
                  <span className="font-semibold text-[#172321]">
                    {DEPARTMENTS.find(d => d.id === department)?.name || department}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64736F]">Preferred Date & Time:</span>
                  <span className="font-semibold text-[#172321]">{date} ({time})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64736F]">Phone Provided:</span>
                  <span className="font-semibold text-[#172321]">{phoneNumber}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 max-w-md mx-auto text-left">
                <strong>Please Note:</strong> Submitting this form does not guarantee an appointment. Our clinical scheduling team will call or SMS you on <strong>{phoneNumber}</strong> within 4 business hours to confirm physician availability.
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="bg-[#075E54] hover:bg-[#05453E] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Notice Banner */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#E7F5F3] border border-[#2F8F83]/30 text-xs text-[#075E54]">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important Notice:</strong> Submitting this form requests an appointment slot. Our clinic coordinator will contact you to confirm final booking details and doctor availability.
                </span>
              </div>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Kwame Mensah"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                        errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-[#E1EBE7]'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-600 text-[11px] mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. 0244 123 456"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                        errors.phoneNumber ? 'border-red-500 bg-red-50/30' : 'border-[#E1EBE7]'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-600 text-[11px] mt-0.5">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Email & Insurance Provider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. patient@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    />
                  </div>
                  {errors.emailAddress && <p className="text-red-600 text-[11px] mt-0.5">{errors.emailAddress}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Health Insurance Type
                  </label>
                  <select
                    value={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  >
                    <option value="NHIS">National Health Insurance Scheme (NHIS)</option>
                    <option value="Private Insurance">Private Insurance (Nationwide, Acacia, Glico, etc.)</option>
                    <option value="Self-Pay / MoMo">Self-Pay / Mobile Money (MoMo)</option>
                    <option value="Corporate / Company">Corporate Partner Account</option>
                  </select>
                </div>
              </div>

              {/* Preferred Department & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Preferred Department
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <select
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        setDoctor(''); // reset doctor if department changes
                      }}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Preferred Doctor (Optional)
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    >
                      <option value="">Any Available Specialist</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.specialty})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                      errors.date ? 'border-red-500 bg-red-50/30' : 'border-[#E1EBE7]'
                    }`}
                  />
                  {errors.date && <p className="text-red-600 text-[11px] mt-0.5">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    >
                      <option value="Morning (8:00 AM – 11:30 AM)">Morning (8:00 AM – 11:30 AM)</option>
                      <option value="Mid-day (12:00 PM – 2:30 PM)">Mid-day (12:00 PM – 2:30 PM)</option>
                      <option value="Late Afternoon (3:00 PM – 5:30 PM)">Late Afternoon (3:00 PM – 5:30 PM)</option>
                      <option value="Evening Clinic (6:00 PM – 8:00 PM)">Evening Clinic (6:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-xs font-semibold text-[#172321] mb-1">
                  Reason for Visit
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                >
                  <option value="Routine Check-up / Consultation">Routine Check-up / Consultation</option>
                  <option value="Antenatal / Maternity Care">Antenatal / Maternity Care</option>
                  <option value="Childhood Health & Immunisation">Childhood Health & Immunisation</option>
                  <option value="Chronic Condition Monitoring (Blood Pressure / Sugar)">Chronic Condition Monitoring (Blood Pressure / Sugar)</option>
                  <option value="Laboratory Test Follow-up">Laboratory Test Follow-up</option>
                  <option value="Prescription Renewal">Prescription Renewal</option>
                  <option value="General Health Complaint / Pain">General Health Complaint / Pain</option>
                </select>
              </div>

              {/* Additional Message / Symptoms */}
              <div>
                <label className="block text-xs font-semibold text-[#172321] mb-1">
                  Additional Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any specific symptoms or special mobility assistance needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E1EBE7]">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#E1EBE7] text-sm font-medium text-[#172321] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#075E54] hover:bg-[#05453E] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <span>Request Appointment</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

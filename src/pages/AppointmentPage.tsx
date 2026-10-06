import React, { useState } from 'react';
import { 
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
import { useHospital } from '../context/HospitalContext';

interface AppointmentPageProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({
  initialDepartmentId = 'opd',
  initialDoctorId = '',
}) => {
  const { addAppointment, doctors: contextDoctors, departments: DEPARTMENTS, hospitalInfo } = useHospital();
  const HOSPITAL_INFO = hospitalInfo;

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [department, setDepartment] = useState(initialDepartmentId);
  const [doctor, setDoctor] = useState(initialDoctorId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (8:00 AM – 11:30 AM)');
  const [reason, setReason] = useState('Routine Check-up / Consultation');
  const [message, setMessage] = useState('');
  const [insuranceType, setInsuranceType] = useState('NHIS');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone Number is required for our clinic to reach you.';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please provide a valid telephone number (e.g. 0244 123 456).';
    }
    if (emailAddress && !/\S+@\S+\.\S+/.test(emailAddress)) {
      errs.emailAddress = 'Please enter a valid email address.';
    }
    if (!date) {
      errs.date = 'Please select a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const deptObj = DEPARTMENTS.find((d: any) => d.id === department);
      const docObj = contextDoctors.find((d: any) => d.id === doctor);

      const code = addAppointment({
        fullName,
        phoneNumber,
        emailAddress,
        departmentId: department,
        departmentName: deptObj?.name || 'General OPD',
        doctorId: doctor || undefined,
        doctorName: docObj?.name,
        date,
        timeSlot: time,
        reason,
        message,
        insuranceType,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setReferenceId(code);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }, 400);
  };

  const filteredDoctors = contextDoctors.filter(
    (doc) => !department || doc.departmentId === department
  );


  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero Header */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            APPOINTMENTS & CLINIC VISITS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Schedule Your Visit
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Request an outpatient consultation with our medical practitioners and clinical specialists at K.A. Busia Memorial Hospital.
          </p>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-[#E1EBE7] shadow-xl overflow-hidden">
            
            {/* Form Top Banner */}
            <div className="bg-[#075E54] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading">
                  Outpatient Appointment Request
                </h2>
                <p className="text-xs sm:text-sm text-[#E1EBE7] mt-1">
                  General OPD • Maternity • Paediatrics • Diagnostics • Specialist Clinics
                </p>
              </div>

              <div className="bg-[#05453E] px-3.5 py-1.5 rounded-xl border border-[#D6A84F]/40 text-xs text-[#D6A84F] font-semibold">
                NHIS & Private Insurance Friendly
              </div>
            </div>

            {/* Form Container */}
            <div className="p-6 sm:p-10">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 bg-[#E7F5F3] text-[#075E54] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172321] font-heading">
                    Appointment Request Submitted
                  </h3>
                  
                  <p className="text-sm text-[#64736F] max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. Your request has been queued at our clinical scheduling desk.
                  </p>

                  <div className="bg-[#F7FAF8] border border-[#E1EBE7] rounded-2xl p-5 max-w-md mx-auto text-left space-y-2.5 text-xs">
                    <div className="flex justify-between items-center pb-2.5 border-b border-[#E1EBE7]">
                      <span className="text-[#64736F]">Booking Reference:</span>
                      <span className="font-mono font-bold text-base text-[#075E54]">{referenceId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64736F]">Department:</span>
                      <span className="font-semibold text-[#172321]">
                        {DEPARTMENTS.find(d => d.id === department)?.name || department}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64736F]">Preferred Date:</span>
                      <span className="font-semibold text-[#172321]">{date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64736F]">Preferred Time Slot:</span>
                      <span className="font-semibold text-[#172321]">{time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64736F]">Patient Contact:</span>
                      <span className="font-semibold text-[#172321]">{phoneNumber}</span>
                    </div>
                  </div>

                  {/* Mandatory Notice */}
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-md mx-auto text-left">
                    <strong>Please Note:</strong> Submitting this form does not guarantee an appointment. Our clinical scheduling team will call or SMS you on <strong>{phoneNumber}</strong> within a few hours to confirm doctor availability.
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFullName('');
                        setPhoneNumber('');
                        setDate('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white text-xs font-semibold"
                    >
                      Book Another Visit
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Notice Box */}
                  <div className="p-4 rounded-2xl bg-[#E7F5F3] border border-[#2F8F83]/30 text-xs text-[#075E54] flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-semibold mb-0.5">Booking Availability Policy</strong>
                      Submitting this form does not guarantee an appointment. Our team will contact you to confirm availability and clinic time. For urgent crises, head immediately to the 24/7 Emergency Wing.
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#075E54] font-heading border-b border-[#E1EBE7] pb-2">
                      1. Patient Contact Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Kwabena Acheampong"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                              errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#E1EBE7]'
                            }`}
                          />
                        </div>
                        {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
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
                            className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                              errors.phoneNumber ? 'border-red-500 bg-red-50/20' : 'border-[#E1EBE7]'
                            }`}
                          />
                        </div>
                        {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                          <input
                            type="email"
                            placeholder="e.g. kwame.mensah@gmail.com"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                          />
                        </div>
                        {errors.emailAddress && <p className="text-red-600 text-xs mt-1">{errors.emailAddress}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Payment / Health Insurance Channel
                        </label>
                        <select
                          value={insuranceType}
                          onChange={(e) => setInsuranceType(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                        >
                          <option value="NHIS">National Health Insurance Scheme (NHIS)</option>
                          <option value="Private Insurance">Private Health Insurance (Nationwide, Acacia, etc.)</option>
                          <option value="Self-Pay / MoMo">Self-Pay / Mobile Money (MTN MoMo, Telecel Cash)</option>
                          <option value="Corporate">Corporate / Employer Sponsored</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Department & Doctor */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#075E54] font-heading border-b border-[#E1EBE7] pb-2">
                      2. Clinical Department & Doctor Preference
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Preferred Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-[#64736F] absolute left-3 top-3.5" />
                          <select
                            value={department}
                            onChange={(e) => {
                              setDepartment(e.target.value);
                              setDoctor('');
                            }}
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
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
                          <Stethoscope className="w-4 h-4 text-[#64736F] absolute left-3 top-3.5" />
                          <select
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
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
                  </div>

                  {/* Date & Time Slot */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#075E54] font-heading border-b border-[#E1EBE7] pb-2">
                      3. Date & Schedule Preference
                    </h3>

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
                          className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54] ${
                            errors.date ? 'border-red-500 bg-red-50/20' : 'border-[#E1EBE7]'
                          }`}
                        />
                        {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#172321] mb-1">
                          Preferred Time Window
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-[#64736F] absolute left-3 top-3.5" />
                          <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                          >
                            <option value="Morning (8:00 AM – 11:30 AM)">Morning (8:00 AM – 11:30 AM)</option>
                            <option value="Mid-day (12:00 PM – 2:30 PM)">Mid-day (12:00 PM – 2:30 PM)</option>
                            <option value="Late Afternoon (3:00 PM – 5:30 PM)">Late Afternoon (3:00 PM – 5:30 PM)</option>
                            <option value="Evening Clinic (6:00 PM – 8:00 PM)">Evening Clinic (6:00 PM – 8:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172321] mb-1">
                        Reason for Visit
                      </label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                      >
                        <option value="Routine Check-up / Consultation">Routine Check-up / Consultation</option>
                        <option value="Antenatal / Maternity Booking">Antenatal / Maternity Booking</option>
                        <option value="Childhood Health & Immunisation">Childhood Health & Immunisation</option>
                        <option value="Chronic Condition Monitoring (Hypertension / Sugar)">Chronic Condition Monitoring (Hypertension / Sugar)</option>
                        <option value="Laboratory or Ultrasound Request">Laboratory or Ultrasound Request</option>
                        <option value="Surgical Evaluation / Follow-up">Surgical Evaluation / Follow-up</option>
                        <option value="Prescription Review">Prescription Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#172321] mb-1">
                        Additional Notes or Symptoms (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe what you would like the doctor to know prior to your visit..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                      />
                    </div>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-4 border-t border-[#E1EBE7] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#64736F]">
                      Need immediate help? Call <strong>{HOSPITAL_INFO.contacts.generalPhone}</strong>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-[#D6A84F]" />
                          <span>Request Appointment</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

          {/* Bottom Guidance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-2xl border border-[#E1EBE7] text-xs space-y-1.5">
              <span className="font-bold text-[#075E54] block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F8F83]" />
                What To Bring
              </span>
              <p className="text-[#64736F]">
                Valid Ghana Card, NHIS Card / Private Insurance ID, and previous medical booklets.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E1EBE7] text-xs space-y-1.5">
              <span className="font-bold text-[#075E54] block flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2F8F83]" />
                Arrival Recommendation
              </span>
              <p className="text-[#64736F]">
                Please arrive 15–20 minutes ahead of scheduled time for vital signs checks at OPD triage.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E1EBE7] text-xs space-y-1.5">
              <span className="font-bold text-[#075E54] block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Emergency Cases
              </span>
              <p className="text-[#64736F]">
                Do not wait for an online appointment if experiencing acute chest pain or trauma. Call emergency services immediately.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

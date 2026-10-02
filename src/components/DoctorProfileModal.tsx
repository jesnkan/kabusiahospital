import React from 'react';
import { X, Calendar, Clock, Globe2, Award, ShieldCheck, Stethoscope } from 'lucide-react';
import { Doctor } from '../data/hospitalData';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doctorId: string, departmentId: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookAppointment,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E1EBE7] my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#075E54] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close Doctor Profile"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#D6A84F] shadow-md flex-shrink-0"
            />
            <div>
              <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D6A84F] text-[#172321] mb-1.5">
                {doctor.departmentName}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">{doctor.name}</h3>
              <p className="text-sm text-[#E1EBE7] font-medium">{doctor.role}</p>
              <p className="text-xs text-[#D6A84F] mt-1 font-semibold">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto text-sm">
          
          <div>
            <h4 className="font-bold text-[#172321] font-heading mb-1 text-xs uppercase tracking-wider text-[#075E54]">
              Professional Summary
            </h4>
            <p className="text-[#64736F] leading-relaxed">{doctor.fullBio}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#075E54] mb-1">
                <Award className="w-4 h-4 text-[#D6A84F]" />
                <span>Qualifications & Training</span>
              </div>
              <p className="text-xs text-[#172321] font-medium">{doctor.qualifications}</p>
            </div>

            <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#075E54] mb-1">
                <Clock className="w-4 h-4 text-[#D6A84F]" />
                <span>Clinic Schedule</span>
              </div>
              <p className="text-xs text-[#172321] font-medium">{doctor.availability}</p>
            </div>
          </div>

          <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#075E54] mb-1">
              <Globe2 className="w-4 h-4 text-[#D6A84F]" />
              <span>Consultation Languages</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {doctor.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white border border-[#E1EBE7] text-xs font-medium text-[#172321]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-3 border-t border-[#E1EBE7] flex flex-col sm:flex-row items-center gap-3 justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E1EBE7] text-sm font-medium hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor.id, doctor.departmentId);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Book Consultation With Doctor</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

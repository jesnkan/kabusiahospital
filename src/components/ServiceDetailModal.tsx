import React from 'react';
import { X, Calendar, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { HealthcareService } from '../data/hospitalData';

interface ServiceDetailModalProps {
  service: HealthcareService | null;
  onClose: () => void;
  onBookAppointment: (departmentId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookAppointment,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E1EBE7] my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[#075E54] to-[#04332D] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#D6A84F] block mb-1">
              {service.departmentName}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[65vh] overflow-y-auto space-y-5 text-sm">
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075E54] mb-1.5 font-heading">
              Overview & Clinical Scope
            </h4>
            <p className="text-[#172321] leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Who it is for */}
          <div className="p-4 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075E54] mb-2 font-heading flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2F8F83]" />
              <span>Who This Service Is For</span>
            </h4>
            <ul className="space-y-1.5">
              {service.whoItIsFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#172321]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to expect */}
          <div className="p-4 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075E54] mb-2 font-heading flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
              <span>What To Expect During Your Visit</span>
            </h4>
            <ul className="space-y-1.5">
              {service.whatToExpect.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#172321]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation tips */}
          {service.preparationTips && (
            <div className="p-3.5 bg-[#E7F5F3] rounded-xl border border-[#2F8F83]/30 text-xs text-[#075E54]">
              <strong>Patient Preparation Tip:</strong> {service.preparationTips}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-[#E1EBE7] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E1EBE7] text-sm font-medium hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(service.departmentId);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Inquire / Book For This Service</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

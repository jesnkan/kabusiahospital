import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  UserPlus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Download, 
  RotateCcw, 
  Search,
  MessageSquare,
  Users,
  Building2,
  Save,
  Check
} from 'lucide-react';
import { useHospital, PatientAppointment, ContactMessage } from '../context/HospitalContext';
import { Doctor } from '../data/hospitalData';

interface AdminPortalPageProps {
  onNavigateHome: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigateHome }) => {
  const {
    hospitalInfo,
    doctors,
    departments,
    appointments,
    contactMessages,
    updateHospitalInfo,
    updateContacts,
    updateHours,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    updateAppointmentStatus,
    deleteAppointment,
    updateMessageStatus,
    resetAllToDefaults,
    exportDataJson,
  } = useHospital();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('kabusia_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages' | 'hospital-info' | 'doctors' | 'export'>('appointments');

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Hospital Info Form State
  const [name, setName] = useState(hospitalInfo.name);
  const [tagline, setTagline] = useState(hospitalInfo.tagline);
  const [generalPhone, setGeneralPhone] = useState(hospitalInfo.contacts.generalPhonePlaceholder);
  const [emergencyPhone, setEmergencyPhone] = useState(hospitalInfo.contacts.emergencyPhonePlaceholder);
  const [email, setEmail] = useState(hospitalInfo.contacts.emailPlaceholder);
  const [address, setAddress] = useState(hospitalInfo.contacts.addressPlaceholder);
  const [digitalAddress, setDigitalAddress] = useState(hospitalInfo.contacts.digitalAddress);
  const [outpatientHours, setOutpatientHours] = useState(hospitalInfo.hours.outpatient);

  // New Doctor Form Modal
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [docName, setDocName] = useState('');
  const [docRole, setDocRole] = useState('');
  const [docDeptId, setDocDeptId] = useState('opd');
  const [docSpecialty, setDocSpecialty] = useState('');
  const [docBio, setDocBio] = useState('');
  const [docQualifications, setDocQualifications] = useState('');
  const [docAvailability, setDocAvailability] = useState('');
  const [docLanguages, setDocLanguages] = useState('English, Twi');

  // Appointment filter
  const [appointmentFilter, setAppointmentFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Completed'>('All');
  const [appointmentSearch, setAppointmentSearch] = useState('');

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '1234' || passcode.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('kabusia_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use demonstration code: 1234');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kabusia_admin_auth');
  };

  // Save Hospital Contacts
  const handleSaveHospitalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateHospitalInfo({ name, tagline });
    updateContacts({
      generalPhone: generalPhone,
      generalPhonePlaceholder: generalPhone,
      emergencyPhone: generalPhone,
      emergencyPhonePlaceholder: generalPhone,
      emailPlaceholder: email,
      addressPlaceholder: address,
      digitalAddress: digitalAddress,
    });
    updateHours({ outpatient: outpatientHours });
    showToast('Hospital details updated and live across the website!');
  };

  // Open Doctor Modal for Edit or Add
  const handleOpenDoctorModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctorId(doctor.id);
      setDocName(doctor.name);
      setDocRole(doctor.role);
      setDocDeptId(doctor.departmentId);
      setDocSpecialty(doctor.specialty);
      setDocBio(doctor.shortBio);
      setDocQualifications(doctor.qualifications);
      setDocAvailability(doctor.availability);
      setDocLanguages(doctor.languages.join(', '));
    } else {
      setEditingDoctorId(null);
      setDocName('');
      setDocRole('Medical Officer');
      setDocDeptId('opd');
      setDocSpecialty('General Medicine');
      setDocBio('Experienced physician dedicated to patient-centred healthcare.');
      setDocQualifications('MB ChB (Ghana)');
      setDocAvailability('Mon – Fri (8:00 AM – 4:00 PM)');
      setDocLanguages('English, Twi');
    }
    setIsDoctorModalOpen(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const dept = departments.find(d => d.id === docDeptId);
    const languagesArr = docLanguages.split(',').map(s => s.trim()).filter(Boolean);

    if (editingDoctorId) {
      updateDoctor(editingDoctorId, {
        name: docName,
        role: docRole,
        departmentId: docDeptId,
        departmentName: dept?.name || 'General OPD',
        specialty: docSpecialty,
        shortBio: docBio,
        fullBio: docBio,
        qualifications: docQualifications,
        availability: docAvailability,
        languages: languagesArr,
      });
      showToast(`Updated profile for ${docName}`);
    } else {
      addDoctor({
        name: docName,
        role: docRole,
        departmentId: docDeptId,
        departmentName: dept?.name || 'General OPD',
        specialty: docSpecialty,
        shortBio: docBio,
        fullBio: docBio,
        qualifications: docQualifications,
        availability: docAvailability,
        languages: languagesArr,
        image: '/images/hospital-facility.jpg',
      });
      showToast(`Added ${docName} to Medical Team`);
    }
    setIsDoctorModalOpen(false);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = appointmentFilter === 'All' || a.status === appointmentFilter;
    const matchesSearch = 
      a.fullName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      a.phoneNumber.includes(appointmentSearch) ||
      a.referenceId.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      a.departmentName.toLowerCase().includes(appointmentSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;
  const unreadMessagesCount = contactMessages.filter(m => m.status === 'Unread').length;

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05453E] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#D6A84F]/40 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#075E54] text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
              <ShieldCheck className="w-8 h-8 text-[#D6A84F]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#172321] font-heading">
              Hospital Admin Portal
            </h1>
            <p className="text-xs text-[#64736F]">
              K.A. Busia Memorial Hospital • Clinical & Content Management
            </p>
          </div>

          <div className="p-3 bg-[#FBF4E4] border border-[#D6A84F]/40 rounded-xl text-xs text-[#93661C] flex items-center justify-between">
            <span><strong>Demo Passcode:</strong> 1234 (or 'admin')</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#D6A84F]/40 font-mono">1234</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#172321] mb-1">
                Enter Staff Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64736F] absolute left-3 top-3.5" />
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  autoFocus
                />
              </div>
              {authError && <p className="text-xs text-red-600 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#075E54] hover:bg-[#05453E] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#D6A84F]" />
              <span>Sign In to Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#E1EBE7]">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#075E54] hover:underline font-semibold"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#075E54] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-[#05453E] text-white border-b border-[#0C776B] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#075E54] border border-[#D6A84F]/40 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading leading-tight">
                K.A. Busia Admin Portal
              </h2>
              <p className="text-[11px] text-[#D6A84F]">
                Live Hospital CMS & Appointments Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#E1EBE7] hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-200 hover:text-white bg-red-900/60 hover:bg-red-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs font-semibold scrollbar-none border-t border-[#0C776B]/40 pt-1">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'appointments'
                ? 'border-[#D6A84F] text-[#D6A84F] bg-white/5'
                : 'border-transparent text-[#E1EBE7] hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Appointments Inbox</span>
            {pendingAppointmentsCount > 0 && (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {pendingAppointmentsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'border-[#D6A84F] text-[#D6A84F] bg-white/5'
                : 'border-transparent text-[#E1EBE7] hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Messages</span>
            {unreadMessagesCount > 0 && (
              <span className="bg-emerald-400 text-black text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('hospital-info')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'hospital-info'
                ? 'border-[#D6A84F] text-[#D6A84F] bg-white/5'
                : 'border-transparent text-[#E1EBE7] hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hospital Details & Emergency Lines</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'doctors'
                ? 'border-[#D6A84F] text-[#D6A84F] bg-white/5'
                : 'border-transparent text-[#E1EBE7] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Doctors & Medical Staff ({doctors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#D6A84F] text-[#D6A84F] bg-white/5'
                : 'border-transparent text-[#E1EBE7] hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Data Sync & Export</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===================================================================== */}
        {/* TAB 1: APPOINTMENTS INBOX */}
        {/* ===================================================================== */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#172321] font-heading">
                  Patient Appointment Requests
                </h3>
                <p className="text-xs text-[#64736F]">
                  Real-time queue of outpatient requests submitted through the website portal.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, ref..."
                    value={appointmentSearch}
                    onChange={(e) => setAppointmentSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>

                <select
                  value={appointmentFilter}
                  onChange={(e: any) => setAppointmentFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending ({appointments.filter(a => a.status === 'Pending').length})</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-[#E1EBE7] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7FAF8] border-b border-[#E1EBE7] text-[#075E54] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Phone / Contact</th>
                      <th className="py-3 px-4">Department & Doctor</th>
                      <th className="py-3 px-4">Requested Date / Time</th>
                      <th className="py-3 px-4">Reason / Notes</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1EBE7]">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                          No appointment requests match this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#F7FAF8]">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#075E54]">
                            {apt.referenceId}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#172321]">
                            {apt.fullName}
                            <span className="block text-[10px] text-gray-500 font-normal">
                              {apt.insuranceType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <a
                              href={`tel:${apt.phoneNumber}`}
                              className="text-[#075E54] hover:underline font-semibold flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3 text-[#D6A84F]" />
                              {apt.phoneNumber}
                            </a>
                            {apt.emailAddress && (
                              <span className="block text-[10px] text-gray-500 font-sans truncate max-w-[140px]">
                                {apt.emailAddress}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#172321] block">
                              {apt.departmentName}
                            </span>
                            <span className="text-[11px] text-[#64736F]">
                              {apt.doctorName || 'Any Specialist'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#172321] block">{apt.date}</span>
                            <span className="text-[11px] text-[#64736F]">{apt.timeSlot}</span>
                          </td>
                          <td className="py-3.5 px-4 max-w-[200px]">
                            <span className="font-semibold text-[#172321] block">{apt.reason}</span>
                            {apt.message && (
                              <span className="text-[11px] text-[#64736F] line-clamp-1 italic">
                                "{apt.message}"
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={apt.status}
                              onChange={(e: any) => {
                                updateAppointmentStatus(apt.id, e.target.value);
                                showToast(`Updated status to ${e.target.value} for ${apt.fullName}`);
                              }}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                apt.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : apt.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : apt.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                                  : 'bg-gray-100 text-gray-800 border-gray-300'
                              }`}
                            >
                              <option value="Pending">Pending Call</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove appointment request for ${apt.fullName}?`)) {
                                  deleteAppointment(apt.id);
                                  showToast('Appointment removed');
                                }
                              }}
                              className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                              title="Delete request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: CONTACT MESSAGES */}
        {/* ===================================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#172321] font-heading">
                Patient & Public Inquiries
              </h3>
              <p className="text-xs text-[#64736F]">
                Messages sent through the Contact Us form on the website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm space-y-3 ${
                    msg.status === 'Unread' ? 'border-[#075E54] ring-1 ring-[#075E54]/20' : 'border-[#E1EBE7]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#075E54] block">
                        {msg.subject}
                      </span>
                      <h4 className="text-base font-bold text-[#172321]">{msg.name}</h4>
                      <p className="text-xs text-[#64736F] font-mono">{msg.phone}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      msg.status === 'Unread' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {msg.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#172321] bg-[#F7FAF8] p-3 rounded-xl border border-[#E1EBE7] leading-relaxed">
                    "{msg.message}"
                  </p>

                  <div className="pt-2 border-t border-[#E1EBE7] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400">{msg.createdAt}</span>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${msg.phone}`}
                        className="px-2.5 py-1 bg-[#E7F5F3] text-[#075E54] rounded-lg font-semibold text-[11px] hover:bg-[#075E54] hover:text-white transition-colors"
                      >
                        Call
                      </a>
                      {msg.status === 'Unread' ? (
                        <button
                          onClick={() => {
                            updateMessageStatus(msg.id, 'Reviewed');
                            showToast('Marked message as Reviewed');
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px]"
                        >
                          Mark Reviewed
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            updateMessageStatus(msg.id, 'Unread');
                            showToast('Marked message as Unread');
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px]"
                        >
                          Mark Unread
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: HOSPITAL INFO & EMERGENCY NUMBERS */}
        {/* ===================================================================== */}
        {activeTab === 'hospital-info' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div>
              <h3 className="text-xl font-bold text-[#172321] font-heading">
                Hospital Information & Contact Numbers
              </h3>
              <p className="text-xs text-[#64736F]">
                Updating these fields will immediately change the phone numbers, emergency hotlines, and address across the entire website.
              </p>
            </div>

            <form onSubmit={handleSaveHospitalInfo} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E1EBE7] shadow-sm space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Hospital Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>
              </div>

              {/* Hospital Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Hospital Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#075E54] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={generalPhone}
                      onChange={(e) => setGeneralPhone(e.target.value)}
                      placeholder="e.g. +233 31 202 4819"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54] font-mono font-medium text-[#172321]"
                    />
                  </div>
                  <p className="text-[11px] text-[#64736F] mt-1">
                    Direct phone line displayed on the header, helpline banners, and contact cards.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. info@kabusiahospital.org.gh"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    />
                  </div>
                </div>
              </div>

              {/* Address & GPS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    Physical Campus Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172321] mb-1">
                    GhanaPost GPS Digital Address
                  </label>
                  <input
                    type="text"
                    value={digitalAddress}
                    onChange={(e) => setDigitalAddress(e.target.value)}
                    placeholder="e.g. GA-382-9102"
                    className="w-full px-3.5 py-2 text-sm border border-[#E1EBE7] rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>
              </div>

              {/* Outpatient Hours */}
              <div>
                <label className="block text-xs font-semibold text-[#172321] mb-1">
                  General OPD Operating Hours
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#64736F] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={outpatientHours}
                    onChange={(e) => setOutpatientHours(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1EBE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E1EBE7] flex justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#D6A84F]" />
                  <span>Save & Publish Live</span>
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: DOCTORS DIRECTORY MANAGEMENT */}
        {/* ===================================================================== */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#172321] font-heading">
                  Medical Team & Staff Directory
                </h3>
                <p className="text-xs text-[#64736F]">
                  Manage consulting physicians, specialists, qualifications, and clinic days.
                </p>
              </div>

              <button
                onClick={() => handleOpenDoctorModal()}
                className="px-4 py-2 bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-[#D6A84F]" />
                <span>Add New Physician</span>
              </button>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-[#E1EBE7] p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#075E54] to-[#04332D] text-[#D6A84F] flex items-center justify-center font-bold text-base shadow-xs flex-shrink-0">
                        {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-2 py-0.5 rounded">
                          {doc.departmentName}
                        </span>
                        <h4 className="text-base font-bold text-[#172321] font-heading mt-1">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-[#D6A84F] font-semibold">{doc.role}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-[#64736F]">
                      <p><strong>Specialty:</strong> {doc.specialty}</p>
                      <p><strong>Qualifications:</strong> {doc.qualifications}</p>
                      <p><strong>Clinic Days:</strong> {doc.availability}</p>
                      <p><strong>Languages:</strong> {doc.languages.join(', ')}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E1EBE7] flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenDoctorModal(doc)}
                      className="px-3 py-1.5 bg-[#E7F5F3] hover:bg-[#075E54] hover:text-white text-[#075E54] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove ${doc.name} from the medical directory?`)) {
                          deleteDoctor(doc.id);
                          showToast(`Removed ${doc.name}`);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: DATA SYNC & EXPORT */}
        {/* ===================================================================== */}
        {activeTab === 'export' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#172321] font-heading">
                Data Sync & Backup
              </h3>
              <p className="text-xs text-[#64736F]">
                Download or copy your customized hospital dataset so developers can commit it directly back to the project repository.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-[#172321]">
                Export Configured Data (JSON)
              </h4>
              <p className="text-xs text-[#64736F]">
                Contains all modified phone numbers, doctors, and department records.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const json = exportDataJson();
                    navigator.clipboard.writeText(json);
                    showToast('Copied JSON to clipboard!');
                  }}
                  className="px-5 py-2.5 bg-[#075E54] hover:bg-[#05453E] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D6A84F]" />
                  <span>Copy JSON to Clipboard</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#E1EBE7] space-y-3">
                <h4 className="text-sm font-bold text-red-900">
                  Reset Data to Factory Defaults
                </h4>
                <p className="text-xs text-gray-500">
                  Clear all customized hospital data and restore the initial template placeholders.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all data back to the default placeholders?')) {
                      resetAllToDefaults();
                      showToast('All hospital data restored to default placeholders.');
                    }
                  }}
                  className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Content</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Edit / Add Doctor Modal */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E1EBE7] space-y-4 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#172321] font-heading">
              {editingDoctorId ? 'Edit Physician Profile' : 'Add New Physician'}
            </h3>

            <form onSubmit={handleSaveDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name & Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kwame Mensah"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Specialist Obstetrician"
                    value={docRole}
                    onChange={(e) => setDocRole(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <select
                    value={docDeptId}
                    onChange={(e) => setDocDeptId(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Clinical Specialty</label>
                <input
                  type="text"
                  placeholder="e.g. Maternal-Fetal Care & Reproductive Health"
                  value={docSpecialty}
                  onChange={(e) => setDocSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Degrees & Qualifications</label>
                <input
                  type="text"
                  placeholder="e.g. MB ChB (UGMS), FWACS"
                  value={docQualifications}
                  onChange={(e) => setDocQualifications(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Clinic Days & Hours</label>
                  <input
                    type="text"
                    placeholder="e.g. Mon, Wed, Fri (8am – 3pm)"
                    value={docAvailability}
                    onChange={(e) => setDocAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Languages (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. English, Twi, Ga"
                    value={docLanguages}
                    onChange={(e) => setDocLanguages(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E1EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="px-4 py-2 border border-[#E1EBE7] rounded-xl text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#075E54] hover:bg-[#05453E] text-white rounded-xl text-xs font-bold"
                >
                  Save Physician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

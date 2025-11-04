import React, { useState, useEffect } from 'react';
import { lawyers, Lawyer } from '../data/lawyers';
import { getDistance } from '../utils/geolocation';
import { PhoneIcon, EmailIcon, ChevronDownIcon } from './Icons';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LawyerCardProps {
    lawyer: Lawyer;
    userLocation: { lat: number; lng: number } | null;
    onBook: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, userLocation, onBook }) => {
    const distance = userLocation ? getDistance(userLocation.lat, userLocation.lng, lawyer.location.lat, lawyer.location.lng).toFixed(1) : null;

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">{lawyer.name}</h3>
                    <p className="text-sm font-semibold text-blue-600">{lawyer.specialty}</p>
                </div>
                {distance && <span className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded-full whitespace-nowrap">{distance} km away</span>}
            </div>
            <p className="text-sm text-slate-600 my-3">{lawyer.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm mt-2 border-t border-slate-200 pt-3">
                <a href={`tel:${lawyer.phone}`} className="flex items-center text-slate-700 hover:text-blue-600 transition-colors">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    <span>{lawyer.phone}</span>
                </a>
                <a href={`mailto:${lawyer.email}`} className="flex items-center text-slate-700 hover:text-blue-600 transition-colors">
                    <EmailIcon className="w-4 h-4 mr-2" />
                    <span>{lawyer.email}</span>
                </a>
            </div>
             <div className="mt-4 pt-3 border-t border-slate-200">
                <button
                    onClick={() => onBook(lawyer)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    )
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{ lawyerName: string; time: string } | null>(null);


  useEffect(() => {
    if (isOpen) {
      setFilteredLawyers([]);
      setHasSearched(false);
      setLocationError(null);
      setIsLoadingLocation(true);
      setBookingConfirmation(null);

      const uniqueSpecialties = [...new Set(lawyers.map(lawyer => lawyer.specialty))].sort();
      setSpecialties(uniqueSpecialties);
      if (uniqueSpecialties.length > 0) {
        setSelectedSpecialty(uniqueSpecialties[0]);
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Could not get your location. Please enable location services. Lawyers will be shown without distance information.");
          setIsLoadingLocation(false);
        }
      );
    }
  }, [isOpen]);

  const handleFindLawyers = () => {
    if (!selectedSpecialty) return;

    setHasSearched(true);
    const lawyersWithSpecialty = lawyers.filter(
      (lawyer) => lawyer.specialty === selectedSpecialty
    );

    if (userLocation) {
      const sortedLawyers = [...lawyersWithSpecialty].sort((a, b) => {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.location.lat, b.location.lng);
        return distA - distB;
      });
      setFilteredLawyers(sortedLawyers);
    } else {
      setFilteredLawyers(lawyersWithSpecialty);
    }
  };

  const handleBookAppointment = (lawyer: Lawyer) => {
    alert(`Booking an appointment with ${lawyer.name}. You will now see a confirmation.`);
    
    // Generate a random future time for the appointment
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 7) + 1); // 1-7 days from now
    const appointmentHour = Math.floor(Math.random() * 8) + 9; // 9 AM to 4 PM
    const appointmentMinutes = Math.random() < 0.5 ? '00' : '30';
    const timeString = `${appointmentHour.toString().padStart(2, '0')}:${appointmentMinutes} ${appointmentHour < 12 ? 'AM' : 'PM'}`;
    const dateString = appointmentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    setBookingConfirmation({
      lawyerName: lawyer.name,
      time: `${dateString} at ${timeString}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
           {bookingConfirmation ? (
             <>
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Appointment Confirmed!</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="p-6 text-center flex-1 flex flex-col justify-center">
                <p className="text-slate-600 mb-2">Your appointment with</p>
                <p className="text-2xl font-bold text-slate-800">{bookingConfirmation.lawyerName}</p>

                <p className="text-slate-600 mt-4 mb-2">is scheduled for:</p>
                <p className="text-lg font-bold text-blue-600 bg-blue-50 p-3 rounded-lg">{bookingConfirmation.time}</p>
                
                <p className="text-sm text-slate-500 mt-6">You will receive a confirmation email shortly (this is a demo).</p>

                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    Done
                </button>
            </div>
             </>
           ) : (
            <>
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">Find a Legal Professional</h2>
                  <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 items-center">
                      <div className="sm:col-span-2 relative">
                          <select
                              value={selectedSpecialty}
                              onChange={(e) => setSelectedSpecialty(e.target.value)}
                              className="w-full appearance-none bg-slate-100 border border-slate-300 text-slate-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              aria-label="Select a legal specialty"
                          >
                              {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                             <ChevronDownIcon className="w-5 h-5" />
                          </div>
                      </div>
                      <button
                          onClick={handleFindLawyers}
                          disabled={!selectedSpecialty || isLoadingLocation}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed w-full"
                      >
                          {isLoadingLocation ? 'Locating...' : 'Find Lawyers'}
                      </button>
                  </div>

                  {locationError && <p className="text-amber-600 bg-amber-100 p-3 rounded-md text-sm mb-4">{locationError}</p>}
                  
                  <div className="space-y-4">
                      {filteredLawyers.length > 0 ? (
                          filteredLawyers.map(lawyer => (
                             <LawyerCard key={lawyer.id} lawyer={lawyer} userLocation={userLocation} onBook={handleBookAppointment}/>
                          ))
                      ) : (
                          hasSearched && (
                              <p className="text-slate-500 text-center py-8">
                                  No lawyers found for the selected specialty.
                              </p>
                          )
                      )}
                      {!hasSearched && (
                           <p className="text-slate-500 text-center py-8">
                              Please select a specialty and click "Find Lawyers" to see results.
                          </p>
                      )}
                  </div>
              </div>
            </>
           )}
        </div>
    </div>
  );
};

export default BookingModal;
import { useState } from "react";
import { openWhatsApp, openEmail } from "@/lib/utils";

// ✅ Grouped by Zone
const zoneContacts = {
  "Najmi Zone": [
    { name: "A.G.L Taha Tanki wala", number: "+91-8109066529" },
    { name: "A.G.L Taher Khandwa wala", number: "+91-9644483860" },
  ],
  "Zainny Mohallah": [
    { name: "G.M Adnan bhai aden", number: "+91-7773862508" },
  ],
  "Saifee Zone": [
    { name: "A.G.L Adnan bhai lashker", number: "+91-7869782551" },
  ],
  "Taiyebi Zone": [
    { name: "Muffadal Siya wala", number: "+91-9244074130" },
  ],
  "Hakimi Zone": [
    { name: "A.G.L Huzefa Saifee", number: "+91-9329578478" },
  ],
  "Ibrahim Zone": [
    { name: "A.G.L Shabbir Mewa wala", number: "+91-9826052057" },
  ],
  "Muffadal Park": [
    { name: "Murtaza Motagam wala", number: "+91-7611105253" },
  ],
};

export default function ContactSection() {
  const handleWhatsAppClick = () => {
    openWhatsApp("919977155253", "Hi, I need help regarding Ujjain Relay Centre services");
  };

  const handleEmailClick = () => {
    openEmail("asharaujjainhelpdesk@gmail.com", "Support Request - Ujjain Relay Centre");
  };

  const [openZone, setOpenZone] = useState<string | null>(null);
  const toggleZone = (zone: string) => {
    setOpenZone(prev => (prev === zone ? null : zone));
  };

  return (
    <section id="contact" className="bg-white rounded-lg material-shadow-2 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get in touch with our support team through WhatsApp or email for immediate assistance.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* WhatsApp */}
        <div className="text-center">
          <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-3xl text-green-600">chat</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp Helpline</h3>
          <p className="text-gray-600 mb-4">Quick support via WhatsApp messaging</p>
          <button
            onClick={handleWhatsAppClick}
            className="contact-button text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            <span className="material-icons mr-2">phone</span>
            +91-9977155253
          </button>
        </div>

        {/* Email */}
        <div className="text-center">
          <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-3xl text-red-600">email</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send detailed queries via email</p>
          <button
            onClick={handleEmailClick}
            className="email-button text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            <span className="material-icons mr-2">mail</span>
            asharaujjainhelpdesk@gmail.com
          </button>
        </div>
      </div>

      
      {/* Zone-wise Contact Grid */}
      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">Zone-wise Helpline Contacts</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(zoneContacts).map(([zone, people]) => (
            <div key={zone} className="bg-white rounded-lg shadow p-4">
              <button
                onClick={() => toggleZone(zone)}
                className="w-full text-left flex justify-between items-center font-medium text-gray-700 hover:text-red-600"
              >
                <span>{zone}</span>
                <span className="material-icons">
                  {openZone === zone ? "expand_less" : "expand_more"}
                </span>
              </button>

              {openZone === zone && (
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {people.map((person, index) => (
                    <li key={index} className="flex justify-between border-b pb-1">
                      <span>{person.name}</span>
                      <a href={`tel:${person.number}`} className="text-red-600 hover:underline">{person.number}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* Important Notice */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <span className="material-icons text-amber-600 mr-3 mt-0.5">warning</span>
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
            <p className="text-amber-700 text-sm">
              For any urgent issues or emergencies, please contact the nearest Burhani Guards Idara office directly. This helpline is for general queries and support only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

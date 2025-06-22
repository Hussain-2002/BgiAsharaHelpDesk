import { useState } from "react";

interface Gate {
  name: string;
  description: string;
  details: string[];
}

const gates: Gate[] = [
  {
    name: "Najmi Zone",
    description: "Main Central Zone access point",
    details: [
      "Gate-1: Mazare Najmi Front gate(Garden Seating)",
      "Gate-2: Mazare Najmi Front gate (Quran Hall)",
      "Gate-3: Campel Wala Gate",
      "Gate-4: Teen Jali Gate",
      "Gate-5: Old Taiyebi School Gate",
      "Gate-6: Mohammed Pura Gate (Burhani Hall)",
      "Gate-7: Jamat Office Gate (Burhani Hall)",
      "Gate-8: Gonsa Darwaja Gate (Burhani Hall)",
      "Gate-9: Mohammedi Masjid Gate",
      "Gate-10: Badri Mohalla Mawaid Gate",
      "Gate-11: Qamru Baugh Masjid Gate",
      "Gate-12: Moiyedi Masjid Gate(Zainny Mohalla)",
      "Gate-13: Moiyedi Masjid Gate (Nazar Masjid Badri Mohalla)",
    ],
  },
  {
    name: "Saifee Zone",
    description: "Saifee Zone Gate Access Point",
    details: [
      "Gate-1: Saifee Masjid Main Gate",
      "Gate-2: Saiyedi Habibullah Saheb",
      "Gate-3: Malkapur Wala Gali Mawaid",
      "Gate-4: Saifee Mohallah Jamat Office Gate Mawaid",
      "Gate-5: Dungri Gali (Fakhri Masjid)",
      "Gate-6: Chanka kuwa Gate (Fakhri Masjid)",
    ],
  },
  {
    name: "Taiyebi Zone",
    description: "Entry point for Southern Region Jamaat",
    details: [
      "Gate-1 : Chai Wala Makan Gate",
      "Gate-2 : Taiyebi Masjid Main Gate",
      "Gate-3 : Babuji Gali Gate",
    ],
  },
  {
    name: "Hakimi Zone",
    description: "Hakimi Zone Gate Access Point",
    details: [
      "Gate-1: Hasanji Badsha Main Gate",
      "Gate-2: Masjid Side Gate(Opp.HasanjiSabeel)",
      "Gate-3: Mawaid Badri Hall Main Gate",
      "Gate-4: Loha na pool Gate",],
  },
  {
    name: "Ibrahimi Zone",
    description: "Exclusive entry for high-level personnel",
    details: [
        "Gate-1: Ibrahim Pura Masjid Side Gate",
        "Gate-2: Ibrahim Pura Main Gate",
        "Gate-3: Mawaid Gate (Lambi Gali)",
        "Gate-4: Kalal sari gate",
        "Gate-5: Baloda Gate",
    ],
  },
  {
    name: "Muffadal Park",
    description: "Quick-response entry for emergency services",
    details: [
        "Gate-1: Taiyebi School(Quran Hall) Gate",
        "Gate-2: Taiyebi School(Auditorium) Gate",
        "Gate-3: Markaz Gate",
        "Gate-4: Behind Taiyebi School Building Gate",
    ],
  },
];

export default function ZonalGatesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleGate = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="Zonal Gates" className="bg-white rounded-lg material-shadow-2 p-8 mt-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Zonal Gates</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the main Zonal Gates across Ujjain. Click a gate to view sub-gates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gates.map((gate, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 card-hover cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => toggleGate(index)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{gate.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{gate.description}</p>
              </div>
              <span className="material-icons text-gray-600">
                {openIndex === index ? "expand_less" : "expand_more"}
              </span>
            </div>

            {openIndex === index && (
              <ul className="mt-4 text-sm text-gray-700 border-t pt-3 list-disc list-inside space-y-1">
                {gate.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

import { openGoogleMaps } from "@/lib/utils";

const ziyaratLocations = [
  {
    name: "Mazar-e-Najmi",
    distance: "Central Zone, Ujjain",
    icon: "location_on",
    query: "Mazaar-e-Najmi, Ujjain",
  },
  {
    name: "Hasanji Badshah AQ",
    distance: "1.2 km from Central Zone",
    icon: "location_on",
    query: "Hasanji Badsha, Ujjain",
  },
  {
    name: "Roza-Syedi Habibullah Saheb QR",
    distance: "450 m from Central Zone",
    icon: "location_on",
    query: "Saifee masjid, Ujjain",
  },
  {
    name: "Dosi ai saheba Qabrastan",
    distance: "800m from central zone",
    icon: "location_on",
    query:
      "Dawoodi Bohra Kabristaan, 93, Adi, Urdupura, Ujjain, Madhya Pradesh 456006",
  },
];

export default function ZiyaratLocationsSection() {
  const handleClick = (query: string) => openGoogleMaps(query);

  return (
    <section
      id="ziyarat-locations"
      className="bg-white rounded-lg material-shadow-2 p-8 mt-10"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Ziyarat Locations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Way to Ziyarat locations across Ujjain. Tap a card for directions on
          Google Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ziyaratLocations.map((loc, i) => (
          <div
            key={i}
            onClick={() => handleClick(loc.query)}
            className="bg-gray-50 rounded-lg p-6 card-hover cursor-pointer transition hover:shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-1">
              <span className="material-icons text-red-600">{loc.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800">
                {loc.name}
              </h3>
            </div>
            <p className="text-gray-400 text-xs">{loc.distance}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const zoneLocations = [
  {
    name: "Najmi Zone",
    description: "Main scanning point for central arrivals infront of Najmi Maternity & Nursing.",
    query: "NAJMI MATERNITY & NURSING, Madhya Pradesh",
  },
  {
    name: "Hakimi & Ibrahimi Zone",
    description: "Dedicated arrival checkpoint near Hasanji Badsha Roza.",
    query: "Hasanji badsha ujjain, Ujjain, Madhya Pradesh",
  },
];

const openGoogleMaps = (query: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
};

export default function ArrivalScanningSection() {
  return (
    <section id="Arrival-Scanning" className="bg-white rounded-lg material-shadow-2 p-8 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Arrival Scanning Zones</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the main arrival scanning zones in Ujjain. Click a zone to view its location on Google Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {zoneLocations.map((zone, i) => (
          <div
            key={i}
            onClick={() => openGoogleMaps(zone.query)}
            className="bg-gray-50 p-6 rounded-lg cursor-pointer transition hover:shadow-lg material-shadow-1"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{zone.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
            <div className="flex items-center space-x-2 text-blue-600 text-sm">
              <span className="material-icons text-base">location_on</span>
              <span className="hover:underline">{zone.query}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

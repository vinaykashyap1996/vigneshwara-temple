export default function HowToReach() {
  const transportOptions = [
    {
      icon: 'subway',
      title: 'By Metro',
      description:
        'Nearest Station: Mantri Square Sampige Road (Green Line). Just a 500m walk.',
    },
    {
      icon: 'directions_bus',
      title: 'By Bus',
      description:
        'Stop: 8th Cross Malleshwaram. Frequent buses (276, 90E) available from Majestic.',
    },
    {
      icon: 'local_parking',
      title: 'Parking',
      description:
        'Dedicated 2-wheeler parking inside. Car parking available on the adjacent 11th cross street.',
    },
  ];

  return (
    <div>
      <h2 className="h3 text-fg mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-orange-500 text-2xl">
          directions
        </span>
        How to Reach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-orange-50 p-5 rounded-lg border border-border hover:border-orange-300 transition-colors"
          >
            <div className="size-10 rounded-full bg-white flex items-center justify-center text-orange-500 mb-4 border border-border shadow-sm">
              <span className="material-symbols-outlined">{option.icon}</span>
            </div>
            <h3 className="text-fg font-bold mb-2">{option.title}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

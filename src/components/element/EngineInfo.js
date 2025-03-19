import Image from "next/image";

export default function EngineInfo() {
  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white space-y-4">
      <h2 className="text-xl font-bold">Motore centrale</h2>
      <div>
        <p className="text-sm opacity-80">Impianto/Componente</p>
        <p className="font-medium">🚢 2.1.4 Propulsione Diesel</p>
      </div>
      <div>
        <p className="text-sm opacity-80">Costruttore</p>
        <p className="font-medium">New Wave Ltd</p>
      </div>
      <div>
        <p className="text-sm opacity-80">Immagine</p>
        <Image src="/engine.png" alt="Motore" width={100} height={100} />
      </div>
    </div>
  );
}

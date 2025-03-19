import Image from 'next/image';

export default function ScanItem({ scan }) {
    return (
      <div className="p-3 bg-[#001c38] rounded-lg flex justify-between items-center">
        <div>
          <p className="font-semibold">{scan.name}</p>
          <p className="text-sm text-gray-400">{scan.details}</p>
        </div>
        <Image 
                            src="/icons/qrcode.svg"
                            alt="Qrcode"
                            width={40} 
                            height={40} 
                            className="rounded-lg"
                          />
      </div>
    );
  }
  
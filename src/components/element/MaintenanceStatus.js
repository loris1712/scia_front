import Image from 'next/image';

const MaintenanceStatus = ({ status }) => {
  return (
    <div>
      <h2 className="text-lg text-[#789fd6] mb-2">Stato manutenzioni</h2>

      <ul>
        {status.map((item, index) => (
          <li key={index} className="text-white flex items-center mb-2">
            {index <= 1 && (
              <div
                className="w-4 h-4 mr-2 rounded-sm"
                style={{
                  backgroundColor: index === 0 ? "#D0021B" : "#F47216",
                }}
              />
            )}

            {index == 2 && (
              <div
                className="w-4 h-4 mr-2 rounded-sm"
                style={{
                  backgroundColor: "#FFFFFF20",
                }}
              />
            )}

            {index == 3 && (
              <Image 
              src="/icons/doc.svg"
              alt="document icon"
              width={15} 
              height={15}
              className=" mr-2 opacity-60"
            />
            )}

            <p>{item.label} ({item.count})</p>

            <div className="ml-auto mr-8">
                <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                </svg>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceStatus;

  
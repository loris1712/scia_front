export default function ScanItem({ scan }) {
    return (
      <div className="p-3 bg-[#001c38] rounded-lg flex justify-between items-center">
        <div>
          <p className="font-semibold">{scan.name}</p>
          <p className="text-sm text-gray-400">{scan.details}</p>
        </div>
        <svg width="14px" height="14px" fill="white" viewBox="0 0 512 512">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
    );
  }
  
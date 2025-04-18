const svgIcons = {
    camera: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M288 144a112 112 0 1 1 0 224 112 112 0 1 1 0-224zm288 80v192c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h41.4l22.3-44.7c5.4-10.7 16.5-17.3 28.5-17.3h263.6c12 0 23.1 6.6 28.5 17.3L470.6 160H512c35.3 0 64 28.7 64 64z" />
      </svg>
    ),
    mic: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M192 352c53 0 96-43 96-96V96a96 96 0 1 0-192 0v160c0 53 43 96 96 96zM360 192h-24c-4.4 0-8 3.6-8 8v56c0 75.1-60.9 136-136 136S56 331.1 56 256V192c0-4.4-3.6-8-8-8H24c-4.4 0-8 3.6-8 8v56c0 91.5 70.6 167 160 175.2V480H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h144c13.3 0 24-10.7 24-24s-10.7-24-24-24H208V423.2c89.4-8.2 160-83.7 160-175.2V200c0-4.4-3.6-8-8-8z" />
      </svg>
    ),
    document: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160L256 0H64zm192 41.4L362.6 128H256V41.4zM96 232c0-13.3 10.7-24 24-24H264c13.3 0 24 10.7 24 24s-10.7 24-24 24H120c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H264c13.3 0 24 10.7 24 24s-10.7 24-24 24H120c-13.3 0-24-10.7-24-24z" />
      </svg>
    ),
    calendar: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M128 0c17.7 0 32 14.3 32 32V64h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48H96V32c0-17.7 14.3-32 32-32zM400 464V192H48V464H400z" />
      </svg>
    ),
    plug: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M96 0c17.7 0 32 14.3 32 32V96H64V32c0-17.7 14.3-32 32-32zm192 0c17.7 0 32 14.3 32 32V96H256V32c0-17.7 14.3-32 32-32zM80 128H304c44.2 0 80 35.8 80 80v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V208c0-44.2 35.8-80 80-80zm16 192H288v32c0 35.3-28.7 64-64 64h-64c-35.3 0-64-28.7-64-64V320z" />
      </svg>
    ),
    alert: (
      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-white opacity-70">
        <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 392c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm25.6-109.7c0 14.1-11.5 25.6-25.6 25.6s-25.6-11.5-25.6-25.6V176c0-14.1 11.5-25.6 25.6-25.6s25.6 11.5 25.6 25.6v138.3z" />
      </svg>
    ),
  };
  
  const Icons = ({ icons }) => {
    if (!Array.isArray(icons) || icons.length === 0) return null; // ✅ Previene errori se non è un array
  
    return (
      <div className="flex space-x-2">
        {icons.map((icon, index) => (
          <div key={index}>{svgIcons[icon] || null}</div> // ✅ Controlla che l'icona esista
        ))}
      </div>
    );
  };
  
  export default Icons;
  
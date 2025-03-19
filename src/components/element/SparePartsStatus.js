import Image from 'next/image';

const SparePartsStatus = ({ status }) => {
    return (
      <div>
        <h2 className="text-lg text-[#789fd6] mb-2">Stato ricambi</h2>
        <ul>
          {status.map((item, index) => (
            <li key={index} className="text-white flex items-center mb-2">

              {index == 0 && (
                            <Image 
                            src="/icons/verified.svg"
                            alt="verified icon"
                            width={15} 
                            height={15}
                            className=" mr-2"
                          />
                          )}

                          {index == 1 && (
                            <Image 
                              src="/icons/cart.svg"
                              alt="cart icon"
                              width={15} 
                              height={15}
                              className=" mr-2 opacity-60"
                            />
                          )}
              
                          {index == 2 && (
                            <Image 
                              src="/icons/coming.svg"
                              alt="coming icon"
                              width={15} 
                              height={15}
                              className=" mr-2 opacity-60"
                            />
                          )}
              
                          {index == 3 && (
                            <Image 
                              src="/icons/warning.svg"
                              alt="warning icon"
                              width={15} 
                              height={15}
                              className=" mr-2"
                            />
                          )}

            <p>{item.label} ({item.count})</p> 
            <div className="ml-auto mr-8">
              <svg fill="white" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>
          </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SparePartsStatus;
  
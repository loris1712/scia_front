import Image from 'next/image';

export default function Qrcode({ className }) {
    return (

    <Image 
                                src="/icons/qrcode.svg"
                                alt="Qrcode"
                                width={40} 
                                height={40}
                              />

    );
  }
  
import Image from 'next/image';

export default function BackIcon(props) {
    return (
      <Image 
                                      src="/icons/back.svg"
                                      alt="back"
                                      width="0"
            height="0"
            sizes="100vw"
            style={{ width: '3rem', height: 'auto' }}
                                    />
    );
  }
  
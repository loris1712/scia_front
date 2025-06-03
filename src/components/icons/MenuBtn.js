import Image from 'next/image';

export default function ToolsIcon({ className }) {
    return (
        <Image 
            src="/icons/menu.svg"
            alt="Menu"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '3rem', height: 'auto' }}
        />
    );
} 
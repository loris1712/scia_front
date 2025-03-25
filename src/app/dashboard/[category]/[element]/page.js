import { fetchElementData } from '@/api/elements';
import InfoCard from '@/components/element/InfoCard';
import MaintenanceStatus from '@/components/element/MaintenanceStatus';
import SparePartsStatus from '@/components/element/SparePartsStatus';
import DetailsPanel from '@/components/element/DetailsPanel';
import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import Image from 'next/image';

export default async function ElementPage({ params }) {
  const { element } = await params;
  const data = await fetchElementData(element);

  if (!data) {
    return <p>Elemento non trovato</p>;
  }

  return (
    <div className="flex flex-col bg-[#001c38] text-white p-4">

      <DashboardHeader />
      
            <div className="flex w-full h-[50px] items-center mt-4">
              <Breadcrumbs />
            </div>

      
    <div className="flex items-center pt-2 pb-4">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <button
            type="submit"
            className={'flex items-center ml-auto bg-[#789fd6] hover:bg-blue-500 text-white font-bold py-2 px-4 transition duration-200 cursor-pointer'}
          >
            <Image 
                                                                src="/icons/download.svg"
                                                                alt="download"
                                                                width={15} 
                                                                height={15}
                                                                className=""
                                                              />
                                                              &nbsp;
            Downloads
          </button>
    </div>

    <div className="flex gap-4">
      <div className="w-3/4 space-y-4 bg-[#022a52] p-4 rounded-md">
      
        <InfoCard data={data} />

        <div className="flex px-2">
          <div className="w-1/2">
            <MaintenanceStatus status={data.maintenanceStatus} />
          </div>
          <div className="w-1/2">
            <SparePartsStatus status={data.sparePartsStatus} />
          </div>

        </div>
      </div>

      <div className="w-1/4 bg-[#022a52] p-4 rounded-md">
        <DetailsPanel details={data.details} />
      </div>
      </div>
    </div>
  );
}

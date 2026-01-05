import { Services } from "@/types/services";
import Image from "next/image";
import Link from "next/link";

const SingleServices = ({ services }: { services: Services }) => {
  const { title, image, paragraph } = services;
  return (
    <>
      <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
        <Link
          href="/services-details"
          className="relative block aspect-37/22 w-full"
        >
          <Image src={image} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/services-details"
              className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white"
            >
              {title}
            </Link>
          </h3>
          <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
            {paragraph}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleServices;

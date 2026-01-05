import SectionTitle from "../Common/SectionTitle";
import servicesData from "./servicesData";
import SingleServices from "./SingleServices";

const Services = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="ChirpyChat Services"
          paragraph="Promotional Videos, Avatars, Digital Twins through to custom solutions and agentic applications."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {servicesData.map((services) => (
            <div key={services.id} className="w-full">
              <SingleServices services={services} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

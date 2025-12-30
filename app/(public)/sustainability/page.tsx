import Image from "next/image";
import { title } from "process";

const items = [
  {
    title: "Effluent Treatment Plants (ETP)",
    description:
      "We operate two biological Effluent Treatment Plants (ETPs) with capacities of 220 m³ and 140 m³, both green-certified for high treatment efficiency. Currently, 40% of treated wastewater is recycled for production, with plans to increase this to 70%.",
    img: "/sustainability/1.png",
  },
  {
    title: "Polybag Recycling",
    description:
      "We recycle 100% of plastic polybags used for packaging, collaborating with external agencies to repurpose these materials and reduce waste.",
    img: "/sustainability/2.png",
  },
  {
    title: "Rainwater Harvesting",
    description:
      "Our facilities are equipped with rainwater harvesting systems, reducing dependency on groundwater and providing a renewable source for operational water needs.",
    img: "/sustainability/3.png",
  },
  {
    title: "Sustainable Chemicals",
    description:
      "We exclusively use ZDHC positive-listed chemicals, with 25% certified as Screened Chemistry, ensuring environmental and worker safety in our production processes.",
    img: "/sustainability/4.png",
  },
  {
    title: "Energy efficient Machineries",
    description:
      "Our advanced dyeing and washing machines incorporate technologies such as Airflow, Pressure, and Soft Flow dyeing, reducing water and chemical use by over 50%. Our washing systems optimize wash cycles digitally, cutting water consumption and energy use by 40%. Heat recovery systems further reduce energy demand by reusing thermal energy for heating water.",
    img: "/sustainability/5.png",
  },
  {
    title: "Waste Heat Recovery Boilers",
    description:
      "We utilize waste heat recovery boilers to capture and repurpose thermal energy from exhaust gases, reducing fuel consumption and energy loss.",
    img: "/sustainability/6.png",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-300 py-10 space-y-10">
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold text-primary uppercase text-center">
          Environmental Stewardship <br />
          In Our Processes
        </h1>
        <p className="text-center max-w-200 mx-auto">
          At Al Muslim Group, we are committed to efficient energy usage and
          sustainable manufacturing. We have implemented multiple initiatives to
          reduce our environmental impact
        </p>
      </div>
      {items.map((it, _) => (
        <div
          key={it.title}
          className="grid grid-cols-2 gap-10 max-w-300 mx-auto"
        >
          <div
            className={`place-content-center ${
              _ % 2 !== 0 ? "order-last" : ""
            }`}
          >
            <div className="text-2xl font-semibold py-5 text-primary uppercase">
              {it.title}
            </div>
            <p className="text-justify">{it.description}</p>
          </div>

          <div className="relative mx-auto w-full object-cover rounded-lg overflow-hidden min-h-100 hover:scale-105 transition-all duration-300 cursor-pointer">
            <Image src={it.img} alt={it.title} fill priority />
          </div>
        </div>
      ))}
    </div>
  );
}

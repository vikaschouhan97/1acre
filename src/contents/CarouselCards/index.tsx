import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { LandMedia, LandPrice, LandSize, Property } from "@/utils/types";
import { useState } from "react";

const CarouselCards = ({ property }: { property: Property }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPrice = (landPrice: LandPrice) => {
    if (!landPrice?.price_per_acre_crore) return "Price not available";

    const { lakh, crore } = landPrice.price_per_acre_crore;

    if (lakh !== undefined) {
      return `${lakh} lakhs/acre`;
    }

    if (crore !== undefined) {
      return `${crore}${lakh && lakh > 0 ? `.${lakh}` : ""} Cr/acre`;
    }

    return "Price not available";
  };

  const getTotalLandSize = (landSize: LandSize) => {
    const sizes = landSize?.total_land_size_in_acres;
    if (!sizes) return "Size not available";

    return (
      (sizes.acres ? `${sizes.acres} Acres` : "") ||
      (sizes.cents ? `${sizes.cents} Cents` : "") ||
      (sizes.guntas ? `${sizes.guntas} Guntas` : "Size not available")
    );
  };

  return (
    <Card
      key={property.id}
      className="shadow-md rounded-lg overflow-hidden py-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel opts={{ loop: true }} className="m-0">
        <CarouselContent>
          {property.land_media.map((img: LandMedia, idx: number) => (
            <CarouselItem key={idx}>
              <Image
                src={img.image}
                alt={`Property ${idx}`}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {isHovered && (
          <>
            <div className="absolute bottom-1 left-2 flex items-center justify-center">
              <CarouselPrevious className="relative left-0 translate-x-0 rounded-lg cursor-pointer" />
            </div>
            <div className="absolute bottom-1 right-2 flex items-center justify-center">
              <CarouselNext className="relative right-0 translate-x-0 rounded-lg cursor-pointer" />
            </div>
          </>
        )}
      </Carousel>
      <CardContent className="px-4">
        <div className="flex">
          <h4 className="text-md text-primary">
            Rs {getPrice(property?.land_price)}
          </h4>
          <span className="text-md mx-2">&bull;</span>
          <h4 className="text-md text-primary">
            {getTotalLandSize(property.land_size)}
          </h4>
        </div>
        <h5 className="mb-4 mt-1 text-sm text-[#929292]">
          {property.division_info[2]?.name}, {property.division_info[1]?.name}{" "}
          (dt)
        </h5>
      </CardContent>
    </Card>
  );
};

export default CarouselCards;

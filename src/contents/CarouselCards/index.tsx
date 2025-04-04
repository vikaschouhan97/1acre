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
import { Heart, Share2, MessageCircleReply, Copy } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { propertyDataActions } from "@/lib/slices/propertyData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

/**
 * Utility function to get formatted price string.
 */
export const getPrice = (landPrice: LandPrice) => {
  if (!landPrice?.price_per_acre_crore) return "Price not available";
  const { lakh, crore } = landPrice.price_per_acre_crore;

  if (lakh !== undefined && crore === 0) return `${lakh} lakhs/acre`;
  if (crore !== undefined)
    return `${crore}${lakh && lakh > 0 ? `.${lakh}` : ""} Cr/acre`;

  return "Price not available";
};

/**
 * Utility function to get formatted land size string.
 */
export const getTotalLandSize = (landSize: LandSize) => {
  const sizes = landSize?.total_land_size_in_acres;
  if (!sizes) return "Size not available";

  return (
    (sizes.acres ? `${sizes.acres} Acres` : "") ||
    (sizes.cents ? `${sizes.cents} Cents` : "") ||
    (sizes.guntas ? `${sizes.guntas} Guntas` : "Size not available")
  );
};

/**
 * Component to display property information inside a carousel card.
 */
const CarouselCards = ({ property }: { property: Property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const { likedProperties } = useAppSelector((state) => state.propertyData);

  /**
   * Handle like/unlike property action.
   */
  const handleLikeClick = (id: number) => {
    if (likedProperties?.includes(id)) {
      dispatch(propertyDataActions.removeLikedProperty(id));
    } else {
      dispatch(propertyDataActions.addLikedProperty(property.id));
    }
  };

  return (
    <Card
      key={property.id}
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="300"
      data-aos-once="true"
      className="shadow-md rounded-lg overflow-hidden py-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toast.info("Feature coming soon!")}
    >
      {/* Image Carousel */}
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

        {/* Like Button */}
        <div
          className="absolute top-2 right-14 bg-white p-2 rounded-3xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick(property.id);
          }}
        >
          <Heart
            className={`w-6 h-6 ${
              likedProperties?.includes(property.id) ? "text-red-500" : ""
            }`}
          />
        </div>

        {/* Share Button with Popover */}
        <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
          <Popover>
            <PopoverTrigger className="bg-white p-2 rounded-3xl cursor-pointer">
              <Share2 className="w-6 h-6" />
            </PopoverTrigger>
            <PopoverContent className="p-1 w-[150px]">
              <p
                className="hover:bg-yellow-100 text-sm p-2 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                WhatsApp <MessageCircleReply className="ml-4" />
              </p>
              <p
                className="hover:bg-yellow-100 text-sm p-2 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                Copy Link <Copy className="ml-4" />
              </p>
            </PopoverContent>
          </Popover>
        </div>

        {/* Carousel Navigation Arrows (visible on hover) */}
        {isHovered && (
          <>
            <div
              className="absolute bottom-1 left-2 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <CarouselPrevious className="relative left-0 translate-x-0 rounded-lg cursor-pointer" />
            </div>
            <div
              className="absolute bottom-1 right-2 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <CarouselNext className="relative right-0 translate-x-0 rounded-lg cursor-pointer" />
            </div>
          </>
        )}
      </Carousel>

      {/* Property Details */}
      <CardContent className="px-4">
        <div className="flex">
          <h4 className="text-md text-primary">
            Rs {getPrice(property.land_price)}
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

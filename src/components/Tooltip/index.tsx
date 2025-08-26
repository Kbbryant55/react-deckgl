import IonIcon from "@reacticons/ionicons";

interface TooltipProps {
  x: number;
  y: number;
  object: any;
  layerType: "gas" | "grocery";
  onClose: (id: string) => void;
}

const Tooltip = ({ x, y, object, layerType, onClose }: TooltipProps) => {
  if (!object) return null;

  const getTooltipContent = () => {
    if (layerType === "gas") {
      return {
        name: object.properties?.NAME || "Unknown",
        address: object.properties?.ADDRESS || "Unknown",
        zip: object.properties?.ZIPCODE || "Unknown",
        number_of_pumps: object.properties?.NUMBER_OF_PUMPS || "Unknown",
      };
    } else {
      return {
        name: object.properties?.STORENAME || "Unknown",
        address: object.properties?.ADDRESS || "Unknown",
        zip: object.properties?.ZIPCODE || "Unknown",
      };
    }
  };

  const content = getTooltipContent();

  return (
    <div
      className="absolute bg-white/95 backdrop-blur-sm text-gray-800 p-6 rounded-lg text-sm font-sans z-50 max-w-[250px] shadow-2xl border border-gray-200"
      style={{
        left: x,
        top: y - 140,
        transform: "translateX(-50%) translateY(-30%)",
      }}
    >
      <div className="absolute top-2 right-2">
        <IonIcon
          name="close-outline"
          className="w-4 h-4 text-gray-500 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onClose(object.properties?.GLOBALID);
          }}
        />
      </div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
        <div
          className={`w-3 h-3 rounded-full ${
            layerType === "gas" ? "bg-blue-500" : "bg-green-500"
          }`}
        ></div>
        <div className="font-bold text-base text-gray-900">{content.name}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <IonIcon name="location-outline" className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">{content.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <IonIcon name="business-outline" className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">{content.zip}</span>
        </div>

        {layerType === "gas" && (
          <div className="flex items-center gap-2">
            <IonIcon name="flash-outline" className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              {content.number_of_pumps} pumps
            </span>
          </div>
        )}
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/95"></div>
    </div>
  );
};

export default Tooltip;

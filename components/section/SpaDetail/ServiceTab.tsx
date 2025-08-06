import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useService } from "@/hooks/use-service";
import { GroupedServiceCategory, GroupedServiceItem } from "@/types/service";

export default function SpaServiceCategoryList({ spaId }: { spaId: string }) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  console.log("spa id:", spaId);
  const { simple, combo, fetchServiceBySpaId } = useService(spaId);

  const toggleCategory = (index: number) => {
    const newOpenIndexes = new Set(openIndexes);
    if (newOpenIndexes.has(index)) {
      newOpenIndexes.delete(index);
    } else {
      newOpenIndexes.add(index);
    }
    setOpenIndexes(newOpenIndexes);
  };

  return (
    <>
      {simple.map((category: GroupedServiceCategory, index: number) => (
        <Card key={index} className="border-pink-100">
          <CardHeader
            onClick={() => toggleCategory(index)}
            className="cursor-pointer hover:bg-pink-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800">{category.category}</h2>
          </CardHeader>
          {openIndexes.has(index) && (
            <CardContent>
              <div className="space-y-4">
                {category.items.map((service: GroupedServiceItem, serviceIndex: number) => (
                  <div
                    key={serviceIndex}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-600">Thời gian: {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-pink-600">{service.price}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-1 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                      >
                        Đặt ngay
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </>
  );
}

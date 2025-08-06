export type Promotion = {
  id: string
  title: string
  code: string
  description?: string
  discount_type: "percentage" | "fixed_amount"
  discount_value: number
  original_price?: number
  sale_price?: number
  promo_code?: string
  max_uses?: number
  current_uses: number
  valid_from: string
  validUntil: string
  is_active: boolean
  created_at: string
  updated_at: string
}



export function normalizePromotionDescription(rawData: any): any {
    const endDate = new Date(rawData.endDate);
    const formattedEndDate = `${endDate.getFullYear().toString().slice(2)}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${String(endDate.getDate()).padStart(2, '0')} ${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
  return {
    title: rawData.title,
    code: rawData.code || "",
    description: rawData.description || "",
    validUntil: formattedEndDate,
    created_at: rawData.createdAt,
  };
}
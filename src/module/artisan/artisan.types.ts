export type CreateArtisanRequestBody = {
  name: string;
  location?: string | null;
  materials: string[];
  monthlyCapacity?: number | null;
  reliabilityScore?: number | null;
  notes?: string | null;
};

export type UpdateArtisanRequestBody = Partial<CreateArtisanRequestBody>;
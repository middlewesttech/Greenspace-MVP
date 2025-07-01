export interface Strain {
  id: string;
  strain_name: string;
  description?: string;
  image_url?: string;
  updated_at?: string;
}

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
}

export interface Favorite {
  _id: string;
  strainId: string;
  strainName: string;
  consumptionType?: string;
  dispensary?: string;
}
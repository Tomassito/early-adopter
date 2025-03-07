export type Animal = {
  id: number;
  organization_id: string;
  url: string;
  type: AnimalType;
  species: string;
  breeds: {
    primary: string | null;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  colors: {
    primary: null;
    secondary: null;
    tertiary: null;
  };
  age: 'baby' | 'young' | 'adult' | 'senior' | null;
  gender: 'male' | 'female' | 'unknown' | null;
  size: 'small' | 'medium' | 'large' | 'xlarge' | null;
  coat: 'short' | 'medium' | 'long' | 'wire' | 'hairless' | 'curly' | null;
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: null;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children: boolean;
    dogs: boolean;
    cats: boolean;
  };
  tags: string[];
  name: string;
  description: string;
  photos: Photo[];
  primary_photo_cropped: Photo | null;
  status: 'adoptable' | 'adopted' | 'found';
  // datetime string e.g. "2018-12-22T20:31:32+0000"
  published_at: string;
  contact: {
    email: string;
    phone: string;
    address: Address;
  };
  _links: {
    self: {
      href: string;
    };
    type: {
      href: string;
    };
    organization: {
      href: string;
    };
  };
};

export type Photo = {
  small: string;
  medium: string;
  large: string;
  full: string;
};

export type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export type AnimalType = 'dog' | 'cat' | null;
export type Gender = 'male' | 'female' | 'unknown' | null;
export type AnimalAge = 'young' | 'adult' | 'senior' | null;

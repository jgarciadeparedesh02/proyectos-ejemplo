export interface Champion {
  id: string;
  name: string;
  title: string;
  lore: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  tags: string[];
  image: {
    full: string;
  };
  skins: {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }[];
  spells: {
    id: string;
    name: string;
    description: string;
    image: {
      full: string;
    };
  }[];
}

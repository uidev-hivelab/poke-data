export interface Pokemons {
  name: string;
  url: string;
}
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  height: number;
  weight: number;
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
}

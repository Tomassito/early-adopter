import { create } from 'zustand/react';
import { AnimalAge, AnimalType, Gender } from '@/types/Animal';
import { FIRST_PAGE } from '@/app/constants';
import { NonFunctionKeys } from '@/types/utils';
import { useShallow } from 'zustand/react/shallow';
import { QueryParams } from '@/_baseService/types';
import { getAnimals } from '@/app/_actions/getAnimals';
import { useAnimalStore } from '@/app/store/useAnimalStore';

type MakeSearchArgs = {
  paramsToOverride?: Partial<QueryParams>;
  discardPreviousData?: boolean;
};
type MakeSearch = (args?: MakeSearchArgs) => Promise<void>;

export type AnimalsFiltersStore = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  type: AnimalType;
  setType: (type: AnimalType) => void;
  breed: string | null;
  setBreed: (breed: string | null) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
  age: AnimalAge;
  setAge: (age: AnimalAge) => void;
  name: string | null;
  setName: (name: string) => void;
  makeSearch: MakeSearch;
  appliedFilters: Partial<QueryParams>;
  onFiltersApply: () => void;
};

export const useAnimalsFiltersStore = create<AnimalsFiltersStore>(
  (setState, getState, store) => ({
    page: FIRST_PAGE,
    setPage: (page) => setState({ page }),
    totalPages: 0,
    setTotalPages: (totalPages: number) => setState({ totalPages }),
    type: null,
    setType: (type) => setState({ type }),
    breed: null,
    setBreed: (breed) => setState({ breed }),
    gender: null,
    setGender: (gender) => setState({ gender }),
    age: null,
    setAge: (age) => setState({ age }),
    name: null,
    setName: async (name) => setState({ name: name || null }),
    makeSearch: async ({
      paramsToOverride = {},
      discardPreviousData = false,
    } = {}) => {
      const { setLoading, setIsError, setAnimalsFromPrev } =
        useAnimalStore.getState();
      try {
        setIsError(false);
        setLoading(true);
        const filterValues = {
          ...getState().appliedFilters,
          page: getState().page,
        };
        const {
          animals,
          pagination: { total_pages },
        } = await getAnimals({ ...filterValues, ...paramsToOverride });
        setAnimalsFromPrev((prevAnimals) => [
          ...(discardPreviousData ? [] : prevAnimals),
          ...animals,
        ]);
        setState((prevState) => ({ ...prevState, ...paramsToOverride }));
        setState({ totalPages: total_pages });
      } catch (e) {
        setIsError(true);
      }
      setLoading(false);
    },
    appliedFilters: {},
    onFiltersApply: () => {
      const { page, ...domainFilters } = selectFilterValues(getState());
      setState({ appliedFilters: domainFilters });
      getState().makeSearch({ discardPreviousData: true });
    },
  }),
);

const selectFilterValues = (store: AnimalsFiltersStore) =>
  Object.entries(store).reduce((acc, [key, val]) => {
    if (typeof val !== 'function') {
      // @ts-expect-error acc[key as NonFunctionStore] resolves to never
      acc[key] = val;
    }
    return acc;
  }, {} as NonFunctionStore);

type NonFunctionStore = Pick<
  AnimalsFiltersStore,
  NonFunctionKeys<AnimalsFiltersStore>
>;
export const useFilterValues = () =>
  useAnimalsFiltersStore(useShallow(selectFilterValues));

"use client";

import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { House } from "@/app/components/House";
import { SWRDevTools } from "swr-devtools";
import { useAnimalStore } from "@/app/store/useAnimalStore";
import { useEffect } from "react";
import useSWR from "swr";
import { Paginated } from "@/types/Pagination";
import { AnimalsResponse } from "@/_api/animals/types";
import animals from "@/_api/animals";
import { useAnimalsFiltersStore } from "@/app/store/useAnimalsFiltersStore";

export default function Home() {
  const setAnimalsFromPrev = useAnimalStore(
    (state) => state.setAnimalsFromPrev,
  );
  const setTotalPages = useAnimalsFiltersStore((store) => store.setTotalPages);
  const { isLoading, data } = useSWR<Paginated<AnimalsResponse>>(
    animals.animals,
  );

  useEffect(() => {
    if (data) {
      setAnimalsFromPrev(() => data.animals);
      setTotalPages(data.pagination?.total_pages || 0);
    }
  }, [data, setAnimalsFromPrev, setTotalPages]);

  return (
    <SWRDevTools>
      <main className="p-2 md:p-10 md:pt-1 md:pb-1 max-w-[1024px] my-0 mx-auto overflow-hidden">
        {isLoading ? <LoadingIndicator /> : <House />}
      </main>
    </SWRDevTools>
  );
}

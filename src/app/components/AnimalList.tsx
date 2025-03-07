import SimpleBar from 'simplebar-react';
import { useInView } from 'react-intersection-observer';
import { JSX, useEffect, useRef } from 'react';
import { Animal } from '@/types/Animal';

type Props = {
  animals: Animal[];
  renderAnimalElement: (animal: Animal) => JSX.Element;
  onPageRequested?: () => void;
  loading: boolean;
  errorState?: boolean;
  retryFetch?: () => void;
  renderNoResults?: () => JSX.Element;
};

export const AnimalList = ({
  animals,
  renderAnimalElement,
  onPageRequested,
  loading,
  errorState,
  retryFetch,
  renderNoResults,
}: Props) => {
  const [ref] = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (hasFetchedAtLeastOnce.current && inView) {
        onPageRequested?.();
      }
    },
  });

  const hasFetchedAtLeastOnce = useRef(false);
  useEffect(() => {
    if (!hasFetchedAtLeastOnce.current && !loading) {
      hasFetchedAtLeastOnce.current = true;
    }
  }, [loading]);

  return (
    <div className="relative h-full">
      {hasFetchedAtLeastOnce.current &&
        !loading &&
        animals.length === 0 &&
        renderNoResults?.()}
      {loading && (
        <div
          role="status"
          className="animate-pulse absolute left-0 bottom-0 right-0 z-[2]"
        >
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[80%] mb-2.5 mx-auto"></div>
          <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[60%]"></div>
          <div className="flex items-center justify-center mt-4"></div>
        </div>
      )}
      {errorState ? (
        <div className=" absolute left-0 bottom-0 right-0 top-0 flex justify-center items-center">
          <video
            autoPlay
            muted
            playsInline
            loop
            onClick={retryFetch}
            className="cursor-pointer"
          >
            <source src="/animations/error.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <SimpleBar className="max-h-full" autoHide={false}>
          <div className="flex flex-wrap gap-2 p-2 justify-center">
            {animals.map(renderAnimalElement)}
          </div>
          <div ref={ref} />
        </SimpleBar>
      )}
    </div>
  );
};

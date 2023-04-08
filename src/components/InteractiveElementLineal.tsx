import React, { useState } from "react";

type OptionProps = {
  id: number;
  icon: React.FC<{ classCustom?: string }>;
  label: string;
  title: string;
  description?: string;
  cta?: {
    label: string;
    url: string;
  };
};

type DataProps = {
  data: {
    headline: string;
    options: OptionProps[];
  };
};

export default function InteractiveElementLineal({ data }: DataProps) {
  const [selectedOption, setSelectedOption] = useState({} as OptionProps);
  const [viewSelected, setViewSelected] = useState(false);
  const [thumbValue, setThumbValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleOptionSelection = (option: OptionProps) => {
    setSelectedOption(option);
    setViewSelected(true);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const sliderRect =
      event.currentTarget.parentElement?.getBoundingClientRect();
    if (!sliderRect) return;
    const newPosition = event.clientX - sliderRect.left;
    const percentage = (newPosition / sliderRect.width) * 100;

    setThumbValue(Math.min(Math.max(0, percentage), 100));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(false);

    setTimeout(() => {
      if (thumbValue > 55) {
        handleOptionSelection(data.options[1]);
      } else if (thumbValue < 45) {
        handleOptionSelection(data.options[0]);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col justify-between items-center my-12 gap-6 min-h-[20vh] md:min-h-[25vh]">
      {!viewSelected ? (
        <>
          <h2 className="text-3xl md:text-5xl max-w-[500px] text-center">
            {data.headline}
          </h2>
          <div className="flex  items-center gap-2 sm:gap-8 md:gap-12 w-full justify-center">
            {data.options.map((option, index) => (
              <React.Fragment key={option.id}>
                <div className="animated bg-[var(--color-light)] rounded-3xl flex flex-col items-center justify-center min-w-[125px] min-h-[125px] md:min-w-[175px] md:min-h-[175px] gap-4">
                  <option.icon />
                  <div>{option.label}</div>
                </div>
                {index === Math.floor(data.options.length / 2) - 1 && (
                  <div className=" animated flex relative my-8 h-8 bg-[var(--color-secondary)] max-w-[475px] w-full rounded-xl">
                    <button
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      style={{
                        left: `${thumbValue}%`,
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-[45px] rounded-full bg-[var(--color-primary)]"
                    ></button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center max-w-[900px] mx-auto text-center relative p-12 lg:p-6">
          <button
            className="bg-[var(--color-light)] p-4 w-[20px] h-[20px] flex items-center justify-center rounded-full absolute right-2 top-0"
            onClick={() => setViewSelected(false)}
          >
            x
          </button>
          <h2 className="text-5xl font-semibold mb-4">
            {selectedOption.title}
          </h2>
          <p className="text-xl mb-8">{selectedOption.description}</p>
          {selectedOption.cta?.url && selectedOption.cta?.label && (
            <a
              href={selectedOption.cta.url}
              className="border border-black bg-[var(--color-secondary)]  px-4 py-2 rounded mt-4"
            >
              {selectedOption.cta?.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

import { animate, stagger } from "motion";
import { useEffect, useState } from "react";

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

export default function InteractiveElementSelection({ data }: DataProps) {
  const [selectedOption, setSelectedOption] = useState({} as OptionProps);
  const [viewSelected, setViewSelected] = useState(false);

  const handleOptionSelection = (option: OptionProps) => {
    setSelectedOption(option);
    setViewSelected(true);
  };

  useEffect(() => {
    const allButtons = document.querySelectorAll("button");
    if (!allButtons) return;

    animate(
      allButtons,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: "ease-in-out" }
    );
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-20 gap-6 min-h-[20vh] md:min-h-[50vh]">
      {!viewSelected ? (
        <>
          <h2 className="text-3xl md:text-5xl max-w-[500px] mb-4 text-center md:text-left">
            {data.headline}
          </h2>
          <div className="flex flex-wrap gap-6">
            {data.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelection(option)}
                className="bg-[var(--color-light)] rounded-3xl flex flex-col items-center justify-center min-w-[175px] min-h-[175px] gap-4 hover:bg-[var(--color-secondary)] focus:bg-[var(--color-secondary)]"
              >
                <option.icon />
                <div>{option.label}</div>
              </button>
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

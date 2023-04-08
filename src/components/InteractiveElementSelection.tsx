import { useState } from "react";

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
  // Modal Options
  //   const [modalOpen, setModalOpen] = useState(false);
  //   const handleOpenModal = (option: OptionProps) => {
  //     setSelectedOption(option);
  //     setModalOpen(true);
  //   };

  // Replace Option
  const [viewSelected, setViewSelected] = useState(false);

  const handleOptionSelection = (option: OptionProps) => {
    setSelectedOption(option);
    setViewSelected(true);
  };

  return (
    <div className="flex justify-between items-center my-20 min-h-[20vh]">
      {!viewSelected ? (
        <>
          <h2 className="text-4xl mb-4">{data.headline}</h2>
          <div className="flex gap-6">
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
        <div className="flex flex-col items-center justify-center max-w-[900px] mx-auto text-center relative p-6">
          <button
            className="absolute right-2 top-0"
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
    // Option Modal
    // <div className="flex justify-between items-center my-20">
    //   <div className="text-6xl max-w-[600px]">{data.headline}</div>
    //   <div className="flex gap-6">
    //     {data.options.map((option) => (
    //       <button
    //         key={option.id}
    //         // onClick={() => handleOpenModal(option)}
    //         onClick={() => handleOptionSelection(option)}
    //         className="bg-[var(--color-light)] rounded-3xl flex flex-col items-center justify-center min-w-[175px] min-h-[175px] gap-4 hover:bg-[var(--color-secondary)] focus:bg-[var(--color-secondary)]"
    //       >
    //         <option.icon />
    //         <div>{option.label}</div>
    //       </button>
    //     ))}
    //     {/* // Modal Option  */}
    //     {/* <Modal
    //       open={modalOpen}
    //       title={selectedOption?.title}
    //       onClose={() => setModalOpen(false)}
    //     >
    //       <p>{selectedOption?.description}</p>
    //     </Modal> */}
    //   </div>
    // </div>
  );
}

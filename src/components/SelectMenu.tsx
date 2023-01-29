import { Fragment, ReactNode, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "utils";

type KeyedObject = { id: number | string };
type LabeledObject = { label: ReactNode };

export type SelectMenuProps<T extends KeyedObject & LabeledObject> = {
  renderButton: (selectedValue: T) => JSX.Element;
  onSelect: (value: T) => void;
  options: T[];
  defaultOption: T;
};

export default function SelectMenu<T extends KeyedObject & LabeledObject>({
  renderButton,
  onSelect,
  options,
  defaultOption,
}: SelectMenuProps<T>) {
  return (
    <Listbox defaultValue={defaultOption} onChange={onSelect}>
      {({ open, value }) => (
        <>
          <div className="relative">
            <Listbox.Button className="h-full w-full cursor-default">
              {/* <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span> */}
              {renderButton(value)}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div className="mb-2 border-b border-gray-300 py-2 px-3 text-left">Slippage</div>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-amber-500 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 px-3"
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

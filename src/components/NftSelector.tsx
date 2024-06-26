import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import { NftAsset, useOwnerNfts } from "lib/query/use-owner-nfts";
import { cn } from "lib/utils";
import type { FormInputs, FormToken } from "pages/solana-nft-tools/update";
import { useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { NftSelectorOption } from "./NftSelectorOption";

export const NftSelector = (
  props: UseControllerProps<FormInputs> & { onSelectCallback: (props: any) => void },
) => {
  const { publicKey } = useWallet();
  const [query, setQuery] = useState("");
  const { data } = useOwnerNfts(publicKey?.toString());

  const {
    field: { name, onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController(props);

  const filteredTokens = (data ?? []).filter((nft) =>
    nft.content?.metadata?.name?.toLowerCase().includes(query.toLowerCase()),
  );

  // TODO: fix this!

  return (
    <>
      <Combobox
        as="div"
        value={value}
        onChange={(token: FormToken) => {
          onChange(token);
          props.onSelectCallback(token);
        }}
        nullable
      >
        <Combobox.Label className="sr-only">Mint address</Combobox.Label>

        <div className="relative mt-1">
          <Combobox.Input
            ref={ref}
            type="text"
            data-lpignore="true"
            placeholder="Token"
            autoComplete="off"
            className={cn(
              "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm",
              "focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm",
              error &&
                "border-red-300 text-red-900  focus:border-red-500 focus:outline-none focus:ring-red-500",
            )}
            name={name}
            onBlur={onBlur}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(nft: FormToken) => nft?.name || ""}
            aria-invalid={error ? "true" : "false"}
          />

          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          <Combobox.Options
            className={cn(
              "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg",
              "ring-1 ring-black ring-opacity-5",
              "focus:outline-none sm:text-sm",
            )}
          >
            {query.length > 0 && (
              <Combobox.Option
                value={{ name: query, address: query, uri: "", model: "nft" }}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }
              >
                {query}
              </Combobox.Option>
            )}
            {filteredTokens.map((nft) => (
              <Combobox.Option
                key={nft.id}
                value={{ name: nft.content.metadata.name, mint: nft.id }}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <NftSelectorOption nft={nft} selected={selected} />
                    {selected && (
                      <span
                        className={cn(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>

      {error && (
        <p className="mt-2 text-sm text-red-600" id={error.type}>
          {error.message}
        </p>
      )}
    </>
  );
};

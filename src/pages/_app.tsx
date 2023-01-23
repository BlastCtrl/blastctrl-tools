import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Analytics } from "@vercel/analytics/react";
import { Breadcrumbs, CommandPalette, DesktopWallet, Footer, MobileWallet } from "components";
import { ContextProvider } from "contexts/ContextProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import { classNames } from "utils";
import BlastCtrlIcon from "../../public/blastctrl_icon_white.svg";

dayjs.extend(relativeTime);
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const navigation = [
  { name: "NFT Tools", href: "/solana-nft-tools", description: "Run common Metaplex instructions" },
  { name: "Tokens", href: "/tokens", description: "Manage token accounts" },
  { name: "Storage", href: "/storage", description: "Decentralized file hosting" },
  { name: "Add or remove from collection", href: "/solana-nft-tools/collections", in: "NFT Tools" },
  { name: "Mint NFT", href: "/solana-nft-tools/mint", in: "NFT Tools" },
  { name: "Create collection", href: "/solana-nft-tools/mint", in: "NFT Tools" },
  { name: "Recover nested", href: "/tokens/recover-nested", in: "Tokens" },
  { name: "Fungible token metadata", href: "/tokens/create-token", in: "Tokens" },
  { name: "Upload to Arweave", href: "/storage/file-upload", in: "Storage" },
];

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Solana Tools | Blast Ctrl</title>
      </Head>
      <Toaster position="bottom-left" />
      <ContextProvider>
        <CommandPalette isOpen={isOpen} navigation={navigation} setIsOpen={setIsOpen} />

        <div className="flex min-h-screen flex-col">
          <>
            <Disclosure as="nav" className="bg-primary" aria-label="Global">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    <div className="flex h-16 justify-between">
                      <div className="flex items-center px-2 lg:px-0">
                        <div className="flex flex-shrink-0 items-center">
                          <Link href="/">
                            <a>
                              <Image
                                unoptimized={true}
                                height={38}
                                width={38}
                                src={BlastCtrlIcon}
                                alt="BlastCtrl"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                          {navigation
                            .filter((nav) => !nav.in)
                            .map((item) => (
                              <Link key={item.name} href={item.href}>
                                <a className="rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-primary-focus">
                                  {item.name}
                                </a>
                              </Link>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="w-full max-w-lg lg:max-w-xs">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div
                            onClick={() => setIsOpen(true)}
                            className="relative text-white focus-within:text-white"
                          >
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon
                                className="h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                              />
                            </div>
                            <button
                              id="search"
                              onClick={() => setIsOpen(true)}
                              name="search"
                              value="Search"
                              className={classNames(
                                "block w-full rounded-md border-transparent bg-primary-focus py-2 pl-10 pr-3 text-left text-base leading-5 sm:text-sm",
                                "hover:cursor-text"
                              )}
                            >
                              Search
                            </button>
                            <div className="absolute inset-y-0 right-0 hidden py-1.5 pr-1.5 sm:flex">
                              <kbd className="inline-flex items-center rounded border border-transparent px-2 font-sans text-sm font-medium text-gray-200 shadow-sm">
                                ⌘K
                              </kbd>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center lg:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button
                          className={classNames(
                            "inline-flex items-center justify-center rounded-md p-2 text-gray-50",
                            "hover:bg-accent hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          )}
                        >
                          <span className="sr-only">Open menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              className="block h-6 w-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M 20.25 17.25 L 12.849 17.25"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M 20.25 7.415 L 3.75 7.415"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M 20.25 12.333 L 7.98 12.333"
                              />
                            </svg>
                            // <Bars3BottomRightIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                      <div className="hidden lg:ml-4 lg:flex lg:items-center">
                        {/* Profile dropdown */}
                        <DesktopWallet />
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="lg:hidden">
                    {({ close }) => (
                      <>
                        <div className="flex w-full flex-col items-start gap-y-1 px-2 pt-2 pb-3">
                          {navigation
                            .filter((nav) => !nav.in)
                            .map((item) => (
                              <Disclosure.Button key={item.name}>
                                <Link key={item.name} href={item.href}>
                                  <a
                                    onClick={() => close()}
                                    className="block w-full rounded-md py-2 px-3 text-base font-medium text-white hover:bg-primary-focus hover:text-white"
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              </Disclosure.Button>
                            ))}
                        </div>
                        <MobileWallet />
                      </>
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </>
          <Breadcrumbs />
          <main className="mx-auto max-w-7xl flex-grow px-4 pt-10 pb-12 lg:pb-16">
            <Component {...pageProps} />
            <Analytics />
          </main>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;

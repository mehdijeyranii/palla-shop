import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { mockProducts, type IProduct } from "@/utils/mockData";
import { Link } from "react-router-dom";
import { VerticalDivider } from "../ui";

const DEBOUNCE_DELAY = 300;

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setResults([]);
  }, []);

  const performSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handler = setTimeout(() => {
      performSearch(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [query, isOpen, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  return (
    <div ref={containerRef} className="relative w-full md:w-4/7">
      <div
        className="relative h-12 rounded-md overflow-hidden z-50"
        onClick={openModal}
      >
        <input
          type="text"
          className={`w-full h-full rounded-md px-4 pr-12 text-sm focus:outline-0 ${
            isOpen ? "bg-zinc-100 " : "bg-zinc-200/60"
          } `}
          placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید"
          aria-label="جستجوی محصول"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <Search
          className="absolute top-1/2 -translate-y-1/2 right-4 text-zinc-400 pointer-events-none"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-900/30 z-40"
          onClick={closeModal}
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-full max-h-96 overflow-y-auto bg-white shadow-md rounded-md z-50"
          role="dialog"
          aria-modal="true"
          aria-label="نتایج جستجو"
        >
          <div className="p-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
              </div>
            ) : query ? (
              results.length > 0 ? (
                <ul className="divide-y divide-zinc-200">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.id}`}
                        className="px-4 py-3 border-r-4 border-transparent bg-transparent hover:border-zinc-500 hover:bg-zinc-100 flex items-center gap-4 transition-all duration-200"
                        onClick={closeModal}
                      >
                        <Search className="text-zinc-500" strokeWidth={1.5} />
                        <VerticalDivider height="h-10" />
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-zinc-800">
                            {product.name}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            <strong className="bg-sky-500/10 text-sky-600 px-1 py-0.5 rounded ml-2">
                              {product.category}
                            </strong>
                            <span>{product.brand}</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-zinc-700 text-sm">
                  موردی یافت نشد
                </div>
              )
            ) : (
              <div className="text-center py-4 text-zinc-700 text-sm">
                عبارتی برای جستجو وارد کنید...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

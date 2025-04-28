import { DateFilter } from "@enums/index";
import { useState } from "react";

type HeaderProps = {
  products: string[];
  onFilterChange: (dateFilter: DateFilter, product: string) => void;
};

const Header = ({ products, onFilterChange }: HeaderProps) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState(
    DateFilter.LAST_7_DAYS
  );
  const [selectedProduct, setSelectedProduct] = useState("All");

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDateFilter(value as DateFilter);
    onFilterChange(value as DateFilter, selectedProduct);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProduct(value);
    onFilterChange(selectedDateFilter, value);
  };

  return (
    <div className="flex justify-between pt-7 pb-5 px-50px">
      <h1 className="text-3xl font-semibold text-[#1E293B]">Overview</h1>
      <div className="flex gap-5">
        <select
          className="border rounded-md px-4 py-1 text-sm text-gray-700 shadow-sm bg-white"
          value={selectedDateFilter}
          onChange={handleDateChange}
        >
          <option value={DateFilter.LAST_7_DAYS}>
            {DateFilter.LAST_7_DAYS}
          </option>
          <option value={DateFilter.LAST_30_DAYS}>
            {DateFilter.LAST_30_DAYS}
          </option>
          <option value={DateFilter.THIS_MONTH}>{DateFilter.THIS_MONTH}</option>
          <option value={DateFilter.THIS_YEAR}>{DateFilter.THIS_YEAR}</option>
        </select>
        <select
          className="border rounded-md px-4 py-1 text-sm text-gray-700 shadow-sm bg-white"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          {products.map((product, idx) => (
            <option key={idx}>{product}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;

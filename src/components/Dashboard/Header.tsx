import { DateFilter, ProductsList } from "@enums/index";

const Header = () => {
  return (
    <div className="flex justify-between py-30px px-50px">
      <h1 className="text-4xl font-semibold text-[#1E293B]">Overview</h1>
      <div className="flex gap-5">
        <select className="border rounded-md px-4 py-1 text-sm text-gray-700 shadow-sm bg-white">
          <option>{DateFilter.LAST_7_DAYS}</option>
          <option>{DateFilter.LAST_30_DAYS}</option>
          <option>{DateFilter.THIS_MONTH}</option>
          <option>{DateFilter.THIS_YEAR}</option>
        </select>
        <select className="border rounded-md px-4 py-1 text-sm text-gray-700 shadow-sm bg-white">
          <option>All Products</option>
          <option>{ProductsList.TILICHO}</option>
          <option>{ProductsList.HOTEL_BOOKING}</option>
          <option>{ProductsList.EDU_TECH}</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (Lowest first) " },
          {
            value: "regularPrice-desc",
            label: "Sort by price (Highest first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (Lowest first)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (Highest first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

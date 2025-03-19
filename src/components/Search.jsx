<<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// import { useLazyGetAllQuery } from "../redux/service/product/productSlice";

// export default function TestProduct() {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [fetchProducts, { isFetching, isError }] = useLazyGetAllQuery();

//   const fetchAllProducts = async () => {
//     let allProducts = [];
//     let page = 0;
//     let hasMore = true;

//     while (hasMore) {
//       try {
//         const response = await fetchProducts({ page, size: 12 }).unwrap();

//         if (response?.content && response.content.length > 0) {
//           allProducts = [...allProducts, ...response.content];
//           page++;
//           hasMore = !response.last;
//         } else {
//           hasMore = false;
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         hasMore = false;
//       }
//     }

//     setProducts(allProducts);
//   };

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toUpperCase().includes(searchQuery.toUpperCase())
//   );

//   if (isError) return <p>Error loading products.</p>;

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search your product..."
//         className="w-[250px] py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
//         autoFocus
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />

//       {searchQuery && (
//         <div className="border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
//           {filteredProducts.map((product) => (
//             <div key={product.uuid} className="p-2 hover:bg-gray-100">
//               {product.name}
//             </div>
//           ))}
//           {filteredProducts.length === 0 && <p className="p-2">No matching products found.</p>}
//         </div>
//       )}

//       {isFetching && <p className="text-center mt-4">Loading more products...</p>}
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { useLazyGetAllQuery } from "../redux/service/product/productSlice";
import { useNavigate } from "react-router-dom";

export default function TestProduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [fetchProducts, { isFetching, isError }] = useLazyGetAllQuery();

  const fetchAllProducts = async () => {
    let allProducts = [];
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await fetchProducts({ page, size: 12 }).unwrap();
        console.log("Fetched products:", response); // Debugging line

        if (response?.content && response.content.length > 0) {
          allProducts = [...allProducts, ...response.content];
          page++;
          hasMore = !response.last;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        hasMore = false;
      }
    }

    setProducts(allProducts);
    console.log("All products:", allProducts); // Debugging line
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = (productUuid) => {
    navigate(`/product/${productUuid}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toUpperCase().includes(searchQuery.toUpperCase())
  );
  console.log("Filtered products:", filteredProducts); // Debugging line

  if (isError) return <p>Error loading products.</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search your product..."
        className="w-[250px] py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
        autoFocus
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {searchQuery && (
        <div className="border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.uuid}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductClick(product.uuid)}
            >
              {product.name}
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="p-2">No matching products found.</p>
          )}
        </div>
      )}

      {isFetching && <p className="text-center mt-4">Loading more products...</p>}
    </div>
  );
=======
import React, { useState, useEffect } from "react";
import { useLazyGetAllQuery } from "../redux/service/product/productSlice";

export default function TestProduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [fetchProducts, { isFetching, isError }] = useLazyGetAllQuery();

  const fetchAllProducts = async () => {
    let allProducts = [];
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await fetchProducts({ page, size: 12 }).unwrap();

        if (response?.content && response.content.length > 0) {
          allProducts = [...allProducts, ...response.content];
          page++;
          hasMore = !response.last;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        hasMore = false;
      }
    }

    setProducts(allProducts);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toUpperCase().includes(searchQuery.toUpperCase())
  );

  if (isError) return <p>Error loading products.</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search your product..."
        className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
        autoFocus
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {searchQuery && (
        <div className="border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div key={product.uuid} className="p-2 hover:bg-gray-100">
              {product.name}
            </div>
          ))}
          {filteredProducts.length === 0 && <p className="p-2">No matching products found.</p>}
        </div>
      )}

      {isFetching && <p className="text-center mt-4">Loading more products...</p>}
    </div>
  );
>>>>>>> 7bab5c3072f2538162f55b5237bcb878c23699aa
}
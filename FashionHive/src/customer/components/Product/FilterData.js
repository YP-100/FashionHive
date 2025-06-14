export const color = [
    "white",
    "Black",
    "Red",
    "marun",
    "Being",
    "Pink",
    "Green",
    "Yellow"
];

export const filters = [

    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "blue", label: "Blue" },
            { value: "brown", label: "Brown" },
            { value: "green", label: "Green" },
            { value: "purple", label: "Purple" },
            { value: "pink", label: "Pink" },
            { value: "yellow", label: "Yellow" }
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
            { value: "XL", label: "XL" },
        ],
    },
];
export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "", label: "None" },
            { value: "159-399", label: "₹159 - ₹399" },
            { value: "399-999", label: "₹399 - ₹999" },
            { value: "999-1999", label: "₹999 - ₹1999" },
            { value: "1999-2999", label: "₹1999 - ₹2999" },
            { value: "2999-3999", label: "₹2999 - ₹3999" },
            { value: "3999-4999", label: "₹3999 - ₹4999" },
        ],
    },
    {
        id: "discount",
        name: "Discount Range",
        options: [
            { value: "", label: "None" },
            {value: "10",label: "10% And Above"},
            { value: "20", label: "20% And Above" },
            { value: "30", label: "30% And Above" },
            { value: "40", label: "40% And Above" },
            { value: "50", label: "50% And Above" },
            { value: "60", label: "60% And Above" },
            { value: "70", label: "70% And Above" },
            { value: "80", label: "80% And Above" },
        ],
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "", label: "None" },
            { value: "in_stock", label: "In stock" },
            { value: "out_of_stock", label: "Out of stock" },
        ],
    },
]

export const sortOptions = [

    { name: "price: Low to High", query: "price_low", current: false },
    { name: "price: High to Low", query: "price_high", current: false },

];

export type Product = {
    id : string;
    name: string;
    slug:string;
    price: number;
    subscription? : string;
    description: string;
    features: string[];
    selectOptions? : string[];
    selectTitle? : string;
    image: string;
}

export const PRODUCTS: Product[] = [
    {
        name:"Fresh Pressed Juices",
        image : "/Images/fresh-pressed-juices.webp",
        slug:"fresh-pressed-juices",
        id: "prod_01",
        price:25.00,
        subscription:"every month",
        description:"Buy our cold-pressed variety pack.",
        features:["Vegan","Gluten-free","No GMO’s","No sugar added"],
        selectOptions:["Celery, Spinach, Ginger","Carrot, Apple, Mango","Watermelon, Coconut"],
        selectTitle:"Pack"


    },
        {
        name:"Protein Bars",
        image : "/Images/protein-bars.png",
        slug:"protein-bars",
        id: "prod_02",
        price:36.00,
        subscription:"every month",
        description:"All natural protein bars that you can purchase in a simple reoccurring, monthly order. ",
        features:["25g of protein per serving","Grass fed, non-GMO","No GMO’s","Soy Free and Gluten Free","No rBGH or rBST","No artificial colors, sweeteners or flavors","Zero added sugar"],
        selectOptions:["6","12","24"],
        selectTitle:"Amount"


    },
        {
        name:"Endurance T-Shirt",
        image : "/Images/tee-shirt-crew-klipsan.png",
        slug:"fresh-pressed-juices",
        id: "prod_03",
        price:30.00,
        
        description:"Buy our limited edition Klipsan t-shirt.",
        features:["100% organic cotton"," Pre-washed"],
        
        selectTitle:"Quantity"


    },
        {
        name:"Protein Powder",
        image : "/Images/Protein-Powder.webp",
        slug:"protein-powder",
        id: "prod_04",
        price:30.00,
        subscription:"every month",
        description:"All natural protein powder that you can purchase in a simple reoccurring, monthly order.",
        features:["25g of protein per serving, Spinach, Ginger","Grass fed, non-GMO","Soy Free and Gluten Free"," No rBGH or rBST","Cold processed","No artificial colors, sweeteners or flavors","Zero added sugar"],
        selectTitle:""


    },

        {
        name:"Gift Card",
        slug:"gift-card",
        id: "prod_05",
        price:25.00,
        description:"Purchasing this digital gift card creates a unique code. The gift card recipient can enter this code at checkout to subtract the gift card value from their order total.",
        features:["This gift card never expires."],
        selectOptions:["$25","$50","$75","$100"],
        selectTitle:"Value",
        image : "/Images/gift-card.webp",



    },
    
        {
        name:"Klipsan T-Shirt",
        image : "/Images/tee-shirt-crew.webp",
        slug:"fresh-pressed-juices",
        id: "prod_06",
        price:25.00,
        
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere lorem feugiat volutpat finibus. Sed non tellus in ex aliquet pulvinar sit amet quis elit.",
        features:[" 100% organic cotton","Pre-washed"],
        
        selectTitle:"Quantity"


    }
]

export function getProductBySlug(slug:string):Product | undefined{
    return PRODUCTS.find(product=>product.slug === slug);
}
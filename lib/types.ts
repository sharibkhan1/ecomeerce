export interface Billboard{
    id:string;
    label:string;
    imageUrl:string;
}

export interface Category{
    id:string;
    name:string;
    billboard:Billboard;    
}

export interface Product{
    id:string;
    category:Category;
    name:string;
    price:number;
    isFeatured:boolean;
    size:Size;
    color:Color;
    salesPrice: number;
    images:Image[];
    details: Detail[];  // Include the details array
    stocks: number;    // Stocks as a string (or number if you prefer)
    discription: string; 
    reviews: Review[]; // Added reviews array
}

export interface Review {
    id: string;
    userId: string; // The user who wrote the review
    productId: string; // The product being reviewed
    rating: number; // Rating between 0 and 5
    comment: string | null; // Allow null to match the Prisma schema
    createdAt: Date; // Date when the review was created
    updatedAt: Date; // Date when the review was last updated
}

export interface Detail {
    id:string;
    title: string;
    description: string;
}


export interface Image{
    id:string;
    url:string;
}
export interface Size{
    id:string;
    name:string;
    value:string;
}
export interface Color{
    id:string;
    name:string;
    value:string;
}
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "../../../data/products";
import { ProductDetailView } from "./ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

function findProduct(id: string) {
  const normalized = id.toLowerCase();

  // Check direct product ID
  let product = PRODUCTS.find((p) => p.id.toLowerCase() === normalized);
  if (product) return { product, preselectedSku: undefined };

  // Check product SKU or size SKU
  for (const p of PRODUCTS) {
    if (p.sku.toLowerCase() === normalized) {
      return { product: p, preselectedSku: p.sku };
    }
    const matchingSize = p.sizes?.find(
      (s) => s.sku?.toLowerCase() === normalized || s.sku?.toLowerCase().replace(/[^a-z0-9]/g, "-") === normalized
    );
    if (matchingSize) {
      return { product: p, preselectedSku: matchingSize.sku };
    }
  }

  return { product: undefined, preselectedSku: undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { product } = findProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | The Takeout Box",
    };
  }

  return {
    title: `${product.name} | The Takeout Box Restaurant Supply`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { product, preselectedSku } = findProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} initialSizeSku={preselectedSku} />;
}

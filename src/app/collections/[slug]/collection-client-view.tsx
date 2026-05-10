"use client";

import { useSearchParams } from "next/navigation";
import { CollectionView } from "@/components/collection-view";
import type { Product } from "@/types";

interface CollectionClientViewProps {
  products: Product[];
  collectionName: string;
}

export function CollectionClientView({ products, collectionName }: CollectionClientViewProps) {
  const searchParams = useSearchParams();
  const sellerSlug = searchParams.get("seller") ?? undefined;

  return (
    <CollectionView
      key={sellerSlug ?? "all-sellers"}
      products={products}
      collectionName={collectionName}
      initialSellerSlug={sellerSlug}
    />
  );
}

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category } from '@/lib/types';
import React from "react";

interface CategoryFiltersProps {
  categories: (Category | 'Tous')[];
  selectedCategory: Category | 'Tous';
  onSelectCategory: (category: Category | 'Tous') => void;
}

export function CategoryFilters({ categories, selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  return (
    <div className="flex justify-center mb-8">
      <Select onValueChange={(value) => onSelectCategory(value as Category | 'Tous')} defaultValue={selectedCategory}>
        <SelectTrigger className="w-full max-w-sm">
          <SelectValue placeholder="Sélectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

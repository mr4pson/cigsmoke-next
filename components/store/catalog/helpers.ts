export const convertQueryParams = (query) => {
  const { categories, brands, colors } = query;
  const categoriesArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : undefined;
  const brandsArray = brands
    ? Array.isArray(brands)
      ? brands
      : [brands]
    : undefined;
  const colorsArray = colors
    ? Array.isArray(colors)
      ? colors
      : [colors]
    : undefined;

  return {
    categories: categoriesArray,
    brands: brandsArray,
    colors: colorsArray
  }
}

export type Pagination = {
  pagination: {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
    _links: {
      previous: {
        // e.g. '/v2/animals?type=dog&page=1'
        href: string;
      };
      next: {
        // e.g. '/v2/animals?type=dog&page=3'
        href: string;
      };
    };
  };
};

export type Paginated<T> = T & Pagination;

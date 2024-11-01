'use client';
import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  pageCount = 1,
  disabled = false,
  router: propRouter,
  searchParams: propSearchParams,
}) {
    
    const defaultRouter = useRouter();
    const defaultSearchParams = useSearchParams();
  
    const router = propRouter || defaultRouter;
    const searchParams = propSearchParams || defaultSearchParams;
  

  const handlePageChange = (event, newPage) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newPage.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  const pageParam = searchParams.get('page');
  const page = pageParam && !isNaN(parseInt(pageParam)) ? parseInt(pageParam) : 1;

  return (
    <MUIPagination
      count={pageCount}
      page={page}
      variant="outlined"
      shape="rounded"
      onChange={handlePageChange}
      disabled={disabled}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
      }}
    />
  );
}
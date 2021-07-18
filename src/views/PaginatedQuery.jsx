import React, { useState } from 'react'
import { useQuery } from 'react-query'

import UserTable from '../components/UserTable'
import { usersCrud } from '../api'

const PAGE_SIZE = 20

function PaginatedQuery() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, status, error } = useQuery(
    ['paginatedUsers', page],
    () => usersCrud.list({ _page: page, _limit: PAGE_SIZE }),
    { keepPreviousData: true }
    // { keepPreviousData: false, cacheTime: 3 }
  )

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <h2 className="mb-4">Paginated Query Example</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
      <div className="flex mt-4 justify-between items-center">
        <button
          className="btn btn-page"
          onClick={prevPage}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="rounded font-semibold text-teal-900">
          Page: {page}
        </span>
        <button
          className="btn btn-page"
          onClick={nextPage}
          disabled={data && data.length < PAGE_SIZE}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginatedQuery

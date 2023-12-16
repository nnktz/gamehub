import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { Results, ResultsSkeleton } from './_components/results'

const SearchPage = ({ searchParams }: { searchParams: { term?: string } }) => {
  if (!searchParams.term) {
    return redirect('/')
  }

  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  )
}

export default SearchPage

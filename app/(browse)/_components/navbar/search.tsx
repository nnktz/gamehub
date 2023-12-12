'use client'

import qs from 'query-string'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Search = () => {
  const router = useRouter()
  const [value, setValue] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) {
      return
    }

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: {
          term: value,
        },
      },
      { skipEmptyString: true },
    )

    router.push(url)
  }

  const onClear = () => {
    setValue('')
  }

  return (
    <form action="" onSubmit={onSubmit} className="relative flex w-full items-center lg:w-[400px]">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer select-none text-muted-foreground transition hover:opacity-75"
          onClick={onClear}
        />
      )}
      <Button type="submit" size={'sm'} variant={'secondary'} className="rounded-l-none">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  )
}

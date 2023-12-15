'use client'

import React from 'react'
import { toast } from 'sonner'
import { ElementRef, useRef, useState, useTransition } from 'react'

import { updateUser } from '@/actions/user'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'

export const BioModal = ({ initialValue }: { initialValue: string | null }) => {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [isPending, startTransition] = useTransition()

  const [value, setValue] = useState(initialValue || '')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('Updated bio successfully')
          closeRef.current?.click()
        })
        .catch((err) => toast.error('Something went wrong'))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>

        <form action="" onSubmit={onSubmit} className="space-y-4">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="User bio"
            disabled={isPending}
            className="resize-none"
          />

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} type="submit" variant={'primary'}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

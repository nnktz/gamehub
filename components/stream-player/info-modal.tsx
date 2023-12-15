'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { ElementRef, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'

import { updateStream } from '@/actions/stream'
import { UploadDropzone } from '@/lib/uploadthing'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Hint } from '../hint'

interface InfoModalProps {
  initialName: string
  initialThumbnailUrl: string | null
}

export const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated successfully')
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed successfully')
          setThumbnailUrl(null)
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>

        <form action="" onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-10">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>

                <Image src={thumbnailUrl} alt="thumbnail" fill />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: '#ffffff',
                    },
                    allowedContent: {
                      color: '#ffffff',
                    },
                    button: {
                      padding: '0 20px',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    toast.success('Uploaded thumbnail successfully')
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    closeRef.current?.click()
                  }}
                  className="p-24"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} variant={'primary'} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

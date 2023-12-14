import { redirect } from 'next/navigation'

import { getUserByUsername } from '@/lib/user-service'

import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'
import { Container } from './_components/container'

const CreatorLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { username: string }
}) => {
  const self = await getUserByUsername(params.username)

  if (!self) {
    return redirect('/')
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default CreatorLayout
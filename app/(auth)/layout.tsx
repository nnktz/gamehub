import Image from 'next/image'
import { Logo } from './_components/logo'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <Image
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Phone image"
              height={400}
              width={600}
            />
          </div>
          <div className="flex h-full flex-col items-center justify-center space-y-6 md:w-8/12 lg:ml-6 lg:w-5/12">
            <Logo />
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthLayout

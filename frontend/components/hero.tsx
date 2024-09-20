import Image from 'next/image'

export default function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Illustration behind hero content */}

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">My Appointment Schedule</h1>
            <p className="text-xl  mb-8" data-aos="fade-up" data-aos-delay="200">The ultimate platform for booking appointments with a wide range of service providers across various fields (development, medicine, art, music) and much more</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">creat your acount </a>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
              </div>
            </div>
          </div>
            <Image
            className='mx-auto'
            src="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1726840170/wyiavtl2dg1beidmy1pp.png"
            width={1024}
            height={576}
            alt="Picture of the author"/>
        </div>
      </div>
    </section>
  )
}

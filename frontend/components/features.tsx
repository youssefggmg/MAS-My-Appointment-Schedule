import Image from "next/image"
export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">some of the features we serve in our platform</h2>
            {/* <p className="text-xl text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <Image
              src="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1726845174/wuci2fwhdfbacx6e2lla.png"
              alt="image"
              width={70}
              height={70}
              />
              <h4 className="h4 mb-2">all in one place</h4>
              <p className="text-lg text-gray-400 text-center">Discover all the services you need in one convenient location, offering a wide range of options. Whether it's professional assistance or personal care, our platform provides multiple choices to cater to your specific needs, ensuring a seamless and efficient experience.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <Image
              src="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1726844904/dzrfsyjoydpo6rtlw9oo.png"
              alt="image"
              width={70}
              height={70}
              />
              <h4 className="h4 mb-2">safe user date</h4>
              <p className="text-lg text-gray-400 text-center">All personal information will be securely protected, ensuring confidentiality and safety between the user and the service provider. Robust security measures prevent unauthorized access and misuse, safeguarding user data with the utmost care.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
            <Image
              src="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1726845357/am7ejhoshpl5ojwnpjin.png"
              alt="image"
              width={70}
              height={70}
              />
              <h4 className="h4 mb-2">quick response</h4>
              <p className="text-lg text-gray-400 text-center">No waiting lines, no more wasting time; enjoy quick and efficient service with streamlined processes. Experience the convenience of instant access and seamless interactions, saving you valuable time and effort.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

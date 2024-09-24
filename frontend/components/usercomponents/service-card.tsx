import Image from "next/image"

interface ServiceCardProps {
  imageUrl: string
  title: string
  description: string
  price: number
}

export default function ServiceCard({
  imageUrl,
  title,
  description,
  price
}: ServiceCardProps = {
  imageUrl: "/placeholder.svg?height=80&width=80",
  title: "Service Title",
  description: "This is a description of the service content. It should be a few sentences long to provide more context.",
  price: 19.99
}) {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden"> {/* Increased max width */}
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch border-2 border-black rounded-lg overflow-hidden bg-white shadow-md"> {/* Border color changed to black */}
        {/* service image */}
        <div className="w-full sm:w-auto p-4 flex items-center justify-center sm:justify-start">
          <Image
            alt={title}
            className="object-cover rounded-lg"
            height={80}
            width={80}
            src={imageUrl}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        {/* service content */}
        <div className="flex-grow p-4 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
          <p className="text-sm sm:text-base text-gray-600">{description}</p>
        </div>
        {/* service actions */}
        <div className="w-full sm:w-auto p-4 flex flex-col justify-center items-center sm:items-end gap-2">
          <div className="flex flex-col items-center sm:items-end w-full">
            <button className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"> {/* Same width for buttons */}
              Book
            </button>
            <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> {/* Same width for buttons */}
              Report
            </button>
          </div>
          {/* price */}
          <p className="text-lg sm:text-2xl font-bold">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

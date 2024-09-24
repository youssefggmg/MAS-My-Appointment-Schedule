import { Metadata } from "next"
import Header from "@/components/usercomponents/header"
import SearchBar from "@/components/usercomponents/searchBare"
import ServiceCard from "@/components/usercomponents/service-card";

export const metadata: Metadata = {
    title: "Home Page",
    description: "this is the user home page",
}



const Dash = () => {
    return (
        <>
            <Header />
            <div className="mx-36">
                <SearchBar />
                <div className="flex flex-wrap justify-center mt-8">
                    <ServiceCard
                        imageUrl="https://res.cloudinary.com/dxbvwgxvf/image/upload/v1727100040/CloudinaryDemo/iahvftsq60fpoag7oox4.jpg"
                        title="Premium Service"
                        description="This premium service offers extensive benefits for our customers."
                        price={29.99}
                    />
                </div>
            </div>
        </>
    )
}

export default Dash

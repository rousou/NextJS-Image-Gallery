import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Static Fetching - NextJS 13.4 Image Gallery",
};

export default async function StaticPage() {
    const respnse = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY);
    const image: UnsplashImage = await respnse.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches and caches data at build time.</strong> Even though the Usnsplash API always returns a new image, we see the same image after refeshing the page until we compile the project again.
            </Alert>
            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.desciption}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={"/users/" + image.user.username}>
                {image.user.username}
            </Link>
        </div>
    );
}
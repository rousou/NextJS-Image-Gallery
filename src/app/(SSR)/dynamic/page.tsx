import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Dynamic Fetching - NextJS 13.4 Image Gallery",
};

export const revalidate = 0;    // 0 => on every refresh new image

export default async function DynamicPage() {
    const respnse = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
    {
        // cache: "no-cache"   // same as revalidate = 0 => refresh = new image
        // cache: "no-store"   // same as revalidate = 0 => refresh = new image
        // next: { revalidate: 0}  // same as revalidate = 0 => refresh = new image
    }
    );
    const image: UnsplashImage = await respnse.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches data dynamically</strong>. Every time you refresh the page, you get a new image from the Unsplash API.
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
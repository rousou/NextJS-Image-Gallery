import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Incremental Static Regeneration - NextJS 13.4 Image Gallery",
};

export const revalidate = 15;    // 15 => on every refresh new image every 15 seconds

export default async function IsrPage() {
    const respnse = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
    {
        // next: { revalidate: 15}  // same as revalidate = 15 => refresh = new image every 15 seconds
    }
    );
    const image: UnsplashImage = await respnse.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page uses<strong>incremental static regeneration</strong>. A new image is fetched every 15 seconds (after refreshing the page) and then served from the cache for the duration.
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
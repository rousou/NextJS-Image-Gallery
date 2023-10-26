import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css"
import { Alert } from "@/components/bootstrap";

const numberOfPhotosToShow = 2;

interface topicProps{
    params: { topic: string, },
    // searchParams: { [key:string]:string | string[] | undefined }
}

// export const revalidate = 0;

// export const dynamicParams = false;     // access only pre loaded pages

// pre loaded pages
export function generateStaticParams(){
    return ["health", "fitness", "coding"].map(topic => ({topic}));
}

export function generateMetadata({ params: { topic } }: topicProps) {
    return{
        title: topic + " - NextJS 13.4 Image Gallery"
    }
}


export default async function Topic({ params: { topic } }: topicProps){
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=${numberOfPhotosToShow}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images: UnsplashImage[] = await response.json();

    return(
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
            </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                        src={image.urls.raw}
                        width={250}
                        height={250}
                        alt={image.desciption}
                        key={image.urls.raw}
                        className={styles.image}
                    />
                ))
            }
        </div>
    );
}
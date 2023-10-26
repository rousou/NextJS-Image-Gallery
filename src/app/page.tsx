import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./(SSR)/topics/[topic]/TopicPage.module.css"
import { Alert, Form } from "@/components/bootstrap";
const numberOfPhotosToShow = 1;

interface customProps{
    params: { topic: string, },
    // searchParams: { [key:string]:string | string[] | undefined }
}


export function generateStaticParams(){
    return ["coding"].map(topic => ({topic}));
}

export default async function Home({ params: { topic } }: customProps) {
    
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${"coding"}&count=${numberOfPhotosToShow}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images: UnsplashImage[] = await response.json();
    const width = Math.min(500, images[0].width);
    const height = (width / images[0].width) * images[0].height;
    
    return (
        <div>
            <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',color: "darkblue"}}>Image Gallery</h1>
            <p/>
            <div className="d-flex flex-column align-items-center">
            {
                images.map(image => (
                    <Image
                        src={image.urls.raw}
                        width={width}
                        height={height}
                        alt={image.desciption}
                        key={image.urls.raw}
                        className="rounded shadow mw-100 h-100"
                    />
                ))
            }
            <p/>
            </div>
            <Alert>
                <p>This is a sample project to showcase and learn the new <strong>NextJS 13 app directory</strong> and its features, including:</p>
                <ul>
                    <li>static and dynamic server-side rendering</li>
                    <li>incremental static generation</li>
                    <li>client-side rendering</li>
                    <li>route handlers (API endpoints)</li>
                    <li>meta-data API</li>
                    <li>and more</li>
                </ul>
                <p>Every page uses different approach to <strong>fetching and caching data</strong>. Click the links in the nav bar to try them out.</p>
            </Alert>
            <Alert variant="secondary">
                <p>Note: In order to load the data on this site, you need to get a <a href="https://unsplash.com/developers">free API key from Unsplash</a> and add it to your <code>.env.local</code> file as <code>UNSPLASH_ACCESS_KEY</code>.</p>
                <p className="mb-0">Unsplash has a free quota of 50 request per hour so you might start getting errors if you try too often</p>
            </Alert>
        </div>
    );
}
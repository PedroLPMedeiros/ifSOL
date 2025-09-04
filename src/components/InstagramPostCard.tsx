import Image from "next/image";
import Link from "next/link";

interface InstagramPostCardProps {
    post: {
        id: string;
        media_url: string;
        permalink: string;
        caption: string;
    };
}

export function InstagramPostCard({post}: InstagramPostCardProps){
    return(
        <div className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/4 p-2">
            <Link href={post.permalink} passHref target="_blank" rel="nooper noreferrer">
                <div 
                className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                    <Image
                        src={post.media_url}
                        alt={post.caption || `Publicação do Instagram ${post.id}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                </div>
            </Link>
        </div>
    );
}
import React, {useState} from "react";

import styles from "./MiniPost.module.scss";
import {formatDate} from "@/utils/formDate";
import {CategoryLink} from "@/Components/Category";
import {Avatar} from "@/Components/Avatar";
import {Link} from "@inertiajs/react";
import PostViewDrawer from "@/Components/PostViewDrawer";


export const MiniPost = ({
                             id,
                             title,
                             user,
                             category,
                             description,
                             imageUrl,
                             slug,
                             createdAt,
                             viewsCount,
                             commentsCount,
                             likesCount,
                             dislikesCount,
                             status,
                             likedType,
                             isOwner,
                             onRemovePost
                         }) => {


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.topInfo}>
                <div className={styles.topUserInfo}>
                    <Avatar
                        height={20}
                        width={20}
                        src={user.avatar}
                        fullName={user.name}
                    />
                    <span className={styles.time}>{formatDate(createdAt)}</span>
                </div>
                <div className="d-flex align-center">
                    {category && (
                        <CategoryLink
                            icon={category.icon}
                            name={category.name}
                            slug={category.slug}
                        />
                    )}
                </div>
            </div>
            {imageUrl && (
                <div onClick={() => setIsOpen(true)} className={styles.imageWrapper}>
                    <img
                        className={styles.image}
                        src={imageUrl}
                        alt={title}
                    />
                </div>
            )}
            <h2 className={styles.title} onClick={() => setIsOpen(true)}>
                {title}
            </h2>

            <RenderHTMLContent htmlString={description}/>


            <PostViewDrawer title={title} isOpen={isOpen} setIsOpen={setIsOpen} description={description} />
        </div>
    );

};

const RenderHTMLContent = ({htmlString}) => {
    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        const cleanHtml = htmlString;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanHtml;

        let result = '';

        const getTextNodes = (node) => {
            for (let i = 0; i < node.childNodes.length; i++) {
                const child = node.childNodes[i];
                if (child.nodeType === Node.TEXT_NODE) {
                    result += child.textContent;
                } else {
                    getTextNodes(child);
                }
            }
        };

        getTextNodes(tempDiv);
        setContent(result);
    }, [htmlString]);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

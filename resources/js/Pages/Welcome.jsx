import {Link, Head} from '@inertiajs/react';
import {MiniPost} from "@/Components/MiniPost";
import {Sidebar} from "@/Components/SideBar";
import {useEffect, useState} from "react";
import {Header} from "@/Components/Header";
import {AddCategoryButton} from "@/Components/AddCategoryButton";
import {useGetFeedQuery} from "@/redux/api/feed";
import {useSelector} from "react-redux";
import {selectUser} from "@/redux/slices/user";
import {LoadMore} from "@/Components/LoadMore";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const user = useSelector(selectUser);


    if (!user) {
        return (
            <>
                <Head title="Welcome"/>

                <div>
                    <Header user={user}/>

                    <div className="wrapper">
                        <div className="sideBar">
                            {user && <Sidebar/>}
                        </div>

                        <div className={'posts'}>
                            <div className={'posts-items'}>
                                <div>Авторизуйтесь</div>
                            </div>
                        </div>

                        <div className="sideComments">
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head title="Welcome"/>

            <div>
                <Header user={user}/>

                <div className="wrapper">
                    <div className="sideBar">
                        {user && <Sidebar/>}
                    </div>
                    <Posts />
                    <div className="sideComments">
                    </div>
                </div>
            </div>
        </>
    );
}


function Posts() {
    const user = useSelector(selectUser);

    const [currentPage, setCurrentPage] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const { data: posts, isFetching, refetch } = useGetFeedQuery(currentPage);

    useEffect(() => {
        if (posts) {
            console.log(posts);

            setAllPosts((prevPosts) => [...prevPosts, ...posts?.data]);
        }
    }, [posts]);

    return (
        <div className="posts">
            <div className="posts-items">

                {allPosts.map((obj) => (
                    <MiniPost
                        key={obj.id}
                        id={obj.id}
                        slug={'test'}
                        title={obj.title}
                        user={{id: 1, name: obj.channel.name, avatar: `/storage/${obj.channel.icon}`}}
                        imageUrl={obj.image}
                        description={obj.description}
                        viewsCount={0}
                        commentsCount={0}
                        likesCount={0}
                        dislikesCount={0}
                        createdAt={obj.pub_date}
                        status={'active'}
                        likedType={null}
                        category={obj.category}
                        isOwner={false}
                        onRemovePost={undefined}
                    />
                ))}
                {allPosts.length ? <LoadMore onClick={() => setCurrentPage(currentPage + 1)} disabled={false}/> : null}

                {user && !allPosts.length ?
                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                        У вас пока нет записей, попробуйте добавить категорию с
                        каналами <AddCategoryButton/>
                    </div> : null}

                {!user ? <div>Авторизуйтесь</div> : null}

            </div>
        </div>
    )
}

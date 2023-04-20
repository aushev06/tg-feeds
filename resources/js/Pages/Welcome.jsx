import {Link, Head} from '@inertiajs/react';
import {MiniPost} from "@/Components/MiniPost";
import {Sidebar} from "@/Components/SideBar";
import {useState} from "react";
import {Header} from "@/Components/Header";
import {AddCategoryButton} from "@/Components/AddCategoryButton";
import {useGetFeedQuery} from "@/redux/api/feed";
import {useSelector} from "react-redux";
import {selectUser} from "@/redux/slices/user";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const user = useSelector(selectUser);
    const feedApi = useGetFeedQuery();


    return (
        <>
            <Head title="Welcome"/>

            <div>
                <Header user={user}/>

                <div className="wrapper">
                    <div className="sideBar">
                        {user && <Sidebar/>}
                    </div>
                    <div className="posts">
                        <div className="posts-items">

                            {feedApi?.data?.data?.map((obj) => (
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
                            {/*{data.length ? <LoadMore onClick={loadMorePosts} disabled={isLoading}/> : null}*/}

                            {user && !feedApi?.data?.data?.length ?
                                <div style={{display: 'flex', alignItems: 'baseline'}}>
                                    У вас пока нет записей, попробуйте добавить категорию с
                                    каналами <AddCategoryButton/>
                                </div> : null}

                            {!user ? <div>Авторизуйтесь</div> : null}

                        </div>
                    </div>
                    <div className="sideComments">
                    </div>
                </div>
            </div>
        </>
    );
}

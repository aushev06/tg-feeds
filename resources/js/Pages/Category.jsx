import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CategoryInfo} from "@/Components/CategoryInfo";
import {MiniPost} from "@/Components/MiniPost";
import {Header} from "@/Components/Header";
import {Sidebar} from "@/Components/SideBar";
import {selectUser} from "@/redux/slices/user";
import {useGetFeedQuery} from "@/redux/api/feed";
import {LoadMore} from "@/Components/LoadMore";

const CategoryPage = (props) => {
    const user = useSelector(selectUser);
    const [category, setCategory] = useState(props.category);

    const [currentPage, setCurrentPage] = useState(1);
    const [allPosts, setAllPosts] = useState(props.feeds?.data || []);
    const {data: posts, isLoading, isFetching, refetch} = useGetFeedQuery(currentPage, {skip: currentPage === 1});

    useEffect(() => {
        if (currentPage !== 1 && posts) {
            setAllPosts((prevPosts) => [...prevPosts, ...posts?.data]);
        }
    }, [posts]);


    return (
        <div>
            <Header/>
            <div className="wrapper">
                <div className="sideBar">
                    <Sidebar/>
                </div>
                <div className="posts">
                    <CategoryInfo
                        name={category.name}
                        icon={`/storage/${category.icon}`}
                    />
                    <div className="posts">
                        <div className="posts-items">
                            {allPosts.map((obj) => (
                                <MiniPost
                                    key={obj.id}
                                    id={obj.id}
                                    slug={''}
                                    title={obj.title}
                                    user={{
                                        id: obj.channel.id,
                                        name: obj.channel.name,
                                        avatar: obj.channel.icon
                                    }}
                                    imageUrl={obj.image}
                                    description={obj.description}
                                    viewsCount={0}
                                    commentsCount={0}
                                    likesCount={0}
                                    dislikesCount={0}
                                    createdAt={obj.pub_date}
                                    status={''}
                                    likedType={undefined}
                                    isOwner={false}
                                />
                            ))}
                            {allPosts.length ? <LoadMore onClick={() => setCurrentPage(currentPage + 1)} disabled={isFetching}/> : null}

                        </div>
                    </div>

                </div>
                <div className="sideComments">
                    {/*<SideComments />*/}
                </div>
            </div>
        </div>
    );
};
export default CategoryPage;

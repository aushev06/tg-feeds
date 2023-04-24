import React, {useState} from "react";
import {useSelector} from "react-redux";
import {CategoryInfo} from "@/Components/CategoryInfo";
import {MiniPost} from "@/Components/MiniPost";
import {Header} from "@/Components/Header";
import {Sidebar} from "@/Components/SideBar";
import {selectUser} from "@/redux/slices/user";

const CategoryPage = () => {
    const user = useSelector(selectUser);
    const [category, setCategory] = useState(null);
    const [posts, setPosts] = useState([]);


    return (
        <div>
            <Header/>
            <div className="wrapper">
                <div className="sideBar">
                    <Sidebar/>
                </div>
                {posts && (
                    <div className="posts">
                        <CategoryInfo
                            name={category.name}
                            description={`Всего записей: 9`}
                            icon={`/storage/${category.icon}`}
                        />
                        <div className="posts">
                            <div className="posts-items">
                                {posts.map((obj) => (
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
                            </div>
                        </div>
                    </div>
                )}
                <div className="sideComments">
                    {/*<SideComments />*/}
                </div>
            </div>
        </div>
    );
};
export default CategoryPage;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import FolderModal from "@/Components/Folder/FolderModal";

export default function Dashboard({auth, feeds}) {
    console.log(feeds);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    <FolderModal/>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            feeds.map(item => {
                                return (
                                    <div key={item.id} className="flex items-start bg-white shadow-md rounded-md mt-1">
                                        <div className="w-1/3">
                                            <img className="object-cover w-full h-full rounded-l-md"
                                                 src={item.image} alt="News Image"/>
                                        </div>
                                        <div className="w-2/3 p-4">
                                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                            <p className="text-sm text-gray-600 mb-4">{item.pub_date} - Категория</p>
                                            <div className="text-gray-800"
                                                 dangerouslySetInnerHTML={{__html: item.description}}>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}

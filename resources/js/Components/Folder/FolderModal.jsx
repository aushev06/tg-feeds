import React, {useState} from 'react';

const FolderModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleDrawer}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
                Открыть Drawer
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-end overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto h-screen px-6 py-4 mx-auto my-8 max-w-md bg-white shadow-lg">
                        <div className="text-left">
                            <h3 className="text-2xl font-semibold">Форма</h3>
                            <form className="mt-4">
                                <label className="block mb-2" htmlFor="input-text">
                                    Текстовый инпут:
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                    id="input-text"
                                    type="text"
                                />
                            </form>
                            <div className="mt-6">
                                <button
                                    onClick={toggleDrawer}
                                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-40"
                    onClick={toggleDrawer}
                ></div>
            )}
        </>
    );
};

export default FolderModal;

import {Box, Button, Drawer, IconButton, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, KeyboardEventHandler, useState} from "react";
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import {axios} from "@/core/axios";
import {useAlert} from "@/hooks/useAlert";

export const AddCategoryButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const list = () => (
        <Box
            sx={{width: 800}}
            role="presentation"
        >
            <CategoryForm close={handleClose}/>
        </Box>
    );


    return (
        <div>

            <Button onClick={handleOpen}>
                <AddIcon/>
            </Button>

            <Drawer
                anchor={'right'}
                open={open}
                onClose={handleClose}
            >
                {list()}
            </Drawer>
        </div>
    )
}

const CategoryForm = ({ close }) => {
    const { openAlert } = useAlert()

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const [dynamicFields, setDynamicFields] = useState([{
        id: 1,
        value: ''
    }]);

    const handleDynamicFieldChange = (
        event,
        id
    ) => {
        const updatedDynamicFields = dynamicFields.map((field) =>
            field.id === id ? {...field, value: event.target.value} : field
        );
        setDynamicFields(updatedDynamicFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Создайте объект FormData для отправки данных, включая файл изображения
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('icon', image);
        }
        dynamicFields.forEach((field, index) =>
            formData.append(`channels[]`, field.value)
        );

        try {
            // Отправьте данные на сервер с помощью POST-запроса
            const response = await axios.post('/api/folders', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            close();

            // Обработка успешного ответа сервера
            console.log('Server response:', response.data);
        } catch (error) {
            openAlert(error.response.data.message, 'error');
            // Обработка ошибок при отправке данных
            console.error('Error sending data:', error);
        }
    };

    const handleImageChange = (event) => {
        if (event?.target?.files?.length) {
            // @ts-ignore
            setImage(event.target.files[0]);
        }
    };


    const handleAddDynamicField = () => {
        setDynamicFields([
            ...dynamicFields,
            {id: dynamicFields.length + 1, value: ''},
        ]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddDynamicField();
        }
    };

    const getName = () => {
        // @ts-ignore
        return image?.name;
    }

    return (
        <div style={{margin: 10}}>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                <TextField
                    label="Название категории"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{mb: 2}}
                    required
                />

                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <Button component="label" variant="outlined" startIcon={<ImageIcon/>}>
                        Загрузить иконку
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Button>
                    {image && (
                        <Box component="span" sx={{ml: 1, overflowWrap: 'break-word'}}>
                            {getName()}
                        </Box>
                    )}
                </Box>

                {dynamicFields.map((field, index) => (
                    <TextField
                        size={'small'}
                        key={field.id}
                        label={`https://t.me/channel`}
                        variant="outlined"
                        value={field.value}
                        onChange={(e) => handleDynamicFieldChange(e, field.id)}
                        // onKeyDown={handleKeyDown}
                        fullWidth
                        sx={{mb: 2}}
                    />
                ))}

                <div style={{marginBottom: 10}}>
                    <Button onClick={handleAddDynamicField} size={'small'} variant="outlined" startIcon={<AddIcon/>}>
                        Добавить канал
                    </Button>
                </div>


                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!name || !image}
                >
                    Добавить категорию
                </Button>
            </Box>
        </div>
    );
};

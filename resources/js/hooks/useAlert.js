import React, {useContext} from 'react';

export const AlertContext = React.createContext({});

export const useAlert = () => {
    return useContext(AlertContext);
};

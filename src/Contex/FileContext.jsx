import React, {createContext, useState} from 'react'


const FileContext = createContext()

const FileProvider = ({children}) => {
    const [file, setFile] = useState(null)

    const setUploadedFile = (newFile) => {
        setFile(newFile)
    }


    return(
        <FileContext.Provider value={{ file, setUploadedFile }}>
            {children}
        </FileContext.Provider>
    )
}

export { FileContext, FileProvider };
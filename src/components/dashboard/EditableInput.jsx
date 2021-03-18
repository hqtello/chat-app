/* eslint-disable */
import React, { useState } from 'react'
import { Input, InputGroup, Icon, Alert } from 'rsuite'

function EditableInput({
    initialValue,
    onSave,
    label = null,
    placeholder = 'Write your value',
    emptyMsg = 'Input is empty',
    ...inputProps
}) {

    const [input, setInput] = useState(initialValue)
    const [isEditable, setIsEditable] = useState(false)

    const handleInputChange = async (value) => {
        await setInput(value)
    }

    const handleEditClick = async () => {
        await setIsEditable(!isEditable)
        setInput(initialValue)
    }

    const handleSaveClick = async () => {
        const trimmed = input.trim()

        if (trimmed === '')
            Alert.info(emptyMsg, 4000)

        if (trimmed !== initialValue)
            await onSave(trimmed)

        setIsEditable(false)
    }

    return (
        <div>
            {label}
            <InputGroup>
                <Input
                    {...inputProps}
                    placeholder={placeholder}
                    disabled={!isEditable}
                    value={input}
                    onChange={handleInputChange}
                />
                <InputGroup.Button onClick={handleEditClick}>
                    <Icon icon={isEditable ? 'close' : 'edit2'} />
                </InputGroup.Button>
                {isEditable &&
                    <InputGroup.Button onClick={handleSaveClick}>
                        <Icon icon='check' />
                    </InputGroup.Button>
                }
            </InputGroup>
        </div>
    )
}

export default EditableInput
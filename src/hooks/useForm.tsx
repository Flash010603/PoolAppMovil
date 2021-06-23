import { useState } from 'react'

export const useForm = <T extends Object>(initState: T ) => {

    const [form, setForm] = useState(initState)


    const onChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return {
        form,
        onChange,
        setForm
    }
}

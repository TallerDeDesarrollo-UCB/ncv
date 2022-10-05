import React, { useState } from 'react'
import Axios from 'axios'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorPage from '../../Components/ErrorPage'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Navbar from '../../Components/NavBar'
import Box from '@mui/material/Box'

function CreateFixedAssetForm(props) {
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        Name: '', // string
        Description: '', // string
        EntryDate: '', // dateTime
        Price: '', // decimal
        Features: '', // string
        Quantity: '' // int
    })
    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    function submit(e) {
        e.preventDefault()
        debugger;
        Axios.post(url, {
            Name: data.Name,
            Description: data.Description == ""? null : data.Description, // string
            EntryDate: data.EntryDate == ""? null : data.EntryDate.split('T')[0], // dateTime
            Price: parseFloat(data.Price).toFixed(2), // decimal
            Features: data.Features == ""? null : data.Features, // string
            Quantity: parseInt(data.Quantity) // int
        }).then((res) => {
            debugger;
            if (res.status == 201) {
                setOpen(true)
                window.location.href = '/activos-fijos'
            }
            console.log(res.status)
        }).catch ((apiError) => {
            setError(apiError);
        })
    }

    if(error){
        return ErrorPage(error)
    }
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
        </Box>
        <div style={{display:'flex', justifyContent:'center'}}>
            <FormContainer title="Crear activo fijo">
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Name"
                    value={data.Name}
                    label="Nombre"
                    type="text"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="Description"
                    value={data.Description}
                    label="Descripción"
                    type="text"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="EntryDate"
                    value={data.EntryDate}
                    label="Fecha de Entrada"
                    type="date"
                />
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Price"
                    value={data.Price}
                    label="Precio"
                    type="number"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="Features"
                    value={data.Features}
                    label="Características"
                    type="text"
                />
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Quantity"
                    value={data.Quantity}
                    label="Cantidad"
                    type="number"
                />
                <Button variant="text" onClick={submit}  id="submit_button">
                    Crear
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Activo Fijo Creado
                    </Alert>
                </Snackbar>
            </FormContainer>
        </div>
        </>
    )
}

export default CreateFixedAssetForm

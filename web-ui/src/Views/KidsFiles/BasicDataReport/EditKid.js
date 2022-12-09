import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import FormContainer from '../../../Components/FormContainer';
import InputText from '../../../Components/InputText';
import ButtonPrimary, { ButtonSecondary } from '../../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';
import { Box } from '@mui/system';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

const genders = [
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'F',
      label: 'F',
    }
  ];

  
var listCheck = {
    checkFirstName: true,
    checkLastName: true,
    checkCI: true,
    checkBirthDate: true,
    checkProgramHouse: true,
    checkBirthPlace: true,
    checkGender: true
};

var listAlerts = {
    alertFirstName: "El Nombre no debe contener numeros ni debe contener simbolos.",
    alertLastName: "El Apellido no debe contener numeros ni debe contener simbolos.",
    alertCI: "El CI debe ser valido!",
    alertBirthDate: "La fecha de nacimiento debe ser una fecha valida!",
    alertProgramHouse: "La Casa debe ser valida!",
    alertBirthPlace: "El lugar de nacimiento debe ser un lugar valido!",
    alertGender: "Debe seleccionar un genero!"
};

function resetChecks(){
    listCheck.checkBirthDate = true;
    listCheck.checkBirthPlace = true;
    listCheck.checkCI = true;
    listCheck.checkFirstName = true;
    listCheck.checkGender = true;
    listCheck.checkLastName = true;
    listCheck.checkProgramHouse = true;
}

function checkData(dataToCheck){
    var check = true;
    var checkNumbers = /[0-9]/;
    if(dataToCheck.firstName.match(checkNumbers) != null){
        listCheck.checkFirstName = false;
        check = false;
    }

    if(dataToCheck.lastName.match(checkNumbers) != null){
        listCheck.checkLastName = false;
        check = false;
    }

    let actualDate = new Date();
    var selectedYear = dataToCheck.birthDate[0] + dataToCheck.birthDate[1] + dataToCheck.birthDate[2] + dataToCheck.birthDate[3];
    var selectedMonth = dataToCheck.birthDate[5] + dataToCheck.birthDate[6];
    var selectedDay = dataToCheck.birthDate[8] + dataToCheck.birthDate[9];

    if( selectedYear > actualDate.getFullYear()) {
        console.log("Seleccion de año posterior.");
        listCheck.checkBirthDate = false;
        check = false;
    }else{
        if( selectedYear == actualDate.getFullYear() && selectedMonth > (actualDate.getMonth()+1)) {
            console.log("Seleccion de mes posterior.");
            listCheck.checkBirthDate = false;
            check = false;
        }else{
            if( selectedYear == actualDate.getFullYear() && selectedMonth == (actualDate.getMonth()+1) && selectedDay > actualDate.getDate()) {
                console.log("Seleccion de dia posterior.");
                listCheck.checkBirthDate = false;
                check = false;
            }
        }
    }
    return check;
}

function EditKidFile() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlKid = process.env.REACT_APP_BACKEND_URL + "/api/kids/"+ kidId 
    const [kid, setKid] = useState([])
    const [open, setOpen] = useState(false)
    const [firstNameValidation, setFirstNameValidation] = useState(false)
    const [lastNameValidation, setLastNameValidation] = useState(false)
    const [birthDateValidation, setBirthDateValidation] = useState(false)

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlKid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
    )}

    useEffect(() => {
        fetchBasicData()
    }, [])
    console.log("kid json: ",kid )

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setKid({
            ...kid,
            [name]:value
        })
    }

    function handleFormSubmit() {
        resetChecks();
        setFirstNameValidation(false);
        setLastNameValidation(false);
        setBirthDateValidation(false);
        if(checkData(kid) > 0){
            axios.put(urlKid, kid)
            .then(function (response) {
                if (response.status == 200){
                    navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Informacion Básica actualizada correctamente"}});
                }
            })
            .catch(function (error) {
                if (error.response){
                    if (error.response.status == 400 )
                        setOpen(true)
                }
            });
        }else{
            console.log("Form terrible, oremos");
            console.log(listCheck);
            if(listCheck.checkFirstName == false) setFirstNameValidation(true);
            if(listCheck.checkLastName == false) setLastNameValidation(true);
            if(listCheck.checkBirthDate == false) setBirthDateValidation(true);
        }
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Informacion Básica sin modificaciones"}});
    }

    // to fix format date to show in edit report
    console.log("fecha: ",kid.birthDate)
    if(kid.birthDate ){
        kid.birthDate = kid.birthDate.split("T")[0]
    }
    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar datos del niño">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        Todos los campos son requeridos
                    </Alert>
                </Collapse>
                <InputText
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={kid.firstName}
                    onChange={handleInputChange}
                />
                <Collapse in={firstNameValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertFirstName}
                    </Alert>
                </Collapse>
                 <InputText
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={kid.lastName}
                    onChange={handleInputChange}
                />
                <Collapse in={lastNameValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertLastName}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="ci"
                    name="ci"
                    type="text"
                    value={kid.ci}
                    onChange={handleInputChange}
                />
                <InputText
                    id="birthDate"
                    name="birthDate"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    value={kid.birthDate}
                    defaultValue={kid.birthDate}
                    onChange={handleInputChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Collapse in={birthDateValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertBirthDate}
                    </Alert>
                </Collapse>
                <InputText
                    id="programHouse"
                    name="programHouse"
                    type="text"
                    value={kid.programHouse}
                    onChange={handleInputChange}
                />
                <InputText
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    value={kid.birthPlace}
                    onChange={handleInputChange}
                />
                <InputText
                    id="gender"
                    name="gender"
                    type="text"
                    value={kid.gender}
                    onChange={handleInputChange}
                >
                </InputText>
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
                
            </FormContainer>
        </div></>
    );
}
export default EditKidFile;

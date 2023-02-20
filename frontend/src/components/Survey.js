import { Stepper, StepLabel, Step, RadioGroup, InputLabel, Select, Box, Radio, Slider, FormLabel } from '@mui/material';
import { MenuItem, FormControl, Button, FormControlLabel, ButtonGroup, Rating, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
    const [queAns, setQueAns] = useState([]);
    useEffect(() => {
        fetch('/getQueAns')
            .then(response => response.json())
            .then(data => { setQueAns(data); })
    }, []);
    const options = [{ id: 1, value: 'Strongly Disagree' }, { id: 2, value: 'Disagree' }, { id: 3, value: 'Neutral' }, { id: 4, value: 'Agree' }, { id: 5, value: 'Strongly Agree' }];
    const sliderOption = [{ value: 1, label: 'Strongly Disagree' }, { value: 2, label: 'Disagree' }, { value: 3, label: 'Neutral' }, { value: 4, label: 'Agree' }, { value: 5, label: 'Strongly Agree' }];
    const [activeStep, setActiveStep] = useState(0);
    const [select, setSelect] = useState('');
    const [radio, setRadio] = useState('');
    const [counter, setCounter] = useState(0);
    const [slider, setSlider] = useState(0);
    const [rating, setRating] = useState(-1);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const nextStep = () => {
        if (activeStep < queAns.length - 1) {
            setActiveStep((currentStep) => currentStep + 1);
        }
        else if (activeStep === queAns.length - 1) {
            const data = queAns;
            console.log(data);
            const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
            fetch('/saveAnswer', requestOptions)
                .then(response => response.json())
                .then(res => console.log(res));
            navigate('/result', { state: { queAns } });
        }
        else {
            return 'Invalid Step';
        }
    };
    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep((currentStep) => currentStep - 1);
        }
        else {
            return 'Invalid Step';
        }
    };
    const onSelectChange = (event) => {
        setSelect(event.target.value);
        queAns.map((queAns, index) => {
            if (index === activeStep) {
                queAns.answer = options.find(obj => { return obj.value === event.target.value });;
            }
            return queAns;
        });
    };
    const onRadioChange = (event) => {
        setRadio(event.target.value);
        queAns.map((queAns, index) => {
            if (index === activeStep) {
                queAns.answer = options.find(obj => { return obj.value === event.target.value });;
            }
            return queAns;
        });
    };
    const onSliderChange = (event) => {
        setSlider(event.target.value);
        queAns.map((queAns, index) => {
            if (index === activeStep) {
                queAns.answer = options.find(obj => { return obj.id === event.target.value });
            }
            return queAns;
        });
    };
    const handleIncrement = () => {
        if (counter < 5) {
            setCounter(counter + 1);
            queAns.map((queAns, index) => {
                if (index === activeStep) {
                    queAns.answer = options.find(obj => { return obj.id === counter + 1 });
                }
                return queAns;
            });
        }
        else {
            return 'Invalid Step';
        }
    };
    const handleDecrement = () => {
        if (counter > 0) {
            setCounter(counter - 1);
            queAns.map((queAns, index) => {
                if (index === activeStep) {
                    queAns.answer = options.find(obj => { return obj.id === counter - 1 });
                }
                return queAns;
            });
        }
        else {
            return 'Invalid Step';
        }
    };
    const onRatingChange = (newRating) => {
        setRating(newRating);
        queAns.map((queAns, index) => {
            if (index === activeStep) {
                queAns.answer = options.find(obj => { return obj.id === newRating });
            }
            return queAns;
        });
    };
    const onTextChange = (event) => {
        setText(event.target.value);
        queAns.map((queAns, index) => {
            if (index === activeStep) {
                queAns.answer = options.find(obj => { return obj.value === event.target.value });
            }
            return queAns;
        });
    };
    const getStepperContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <FormControl style={{ minWidth: 200 }}>
                            <InputLabel id='menu'>Select</InputLabel>
                            <Select labelId='menu' label='Select' value={select} onChange={onSelectChange}>
                                {options.reverse().map(option => {
                                    return (<MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <RadioGroup value={radio} onChange={onRadioChange}>
                            {options.reverse().map(option => {
                                return (<FormControlLabel key={option.id} value={option.value} control={<Radio size='small' />} label={option.value} />);
                            })}
                        </RadioGroup>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Slider aria-label='Custom marks' min={1} step={1} max={5} value={slider} onChange={onSliderChange}
                            getAriaValueText={sliderOption.value} valueLabelDisplay='auto' marks={sliderOption} />
                    </Box>
                );
            case 3:
                return (
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <ButtonGroup size='small' style={{ marginBottom: '20px' }}>
                            <Button onClick={handleIncrement}>+</Button>
                            <Button disabled>{counter}</Button>
                            <Button onClick={handleDecrement}>-</Button>
                        </ButtonGroup>
                        <FormLabel style={{ color: '#000' }}>{counter ? options[counter - 1].value : ''}</FormLabel>
                    </Box>
                );
            case 4:
                return (
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Rating style={{ marginBottom: '20px' }} value={rating} onChange={(event, newRating) => {onRatingChange(newRating)}} />
                        <FormLabel style={{ color: '#000' }}>{rating > -1 ? options[rating - 1].value : ''}</FormLabel>
                    </Box>
                );
            case 5:
                return (
                    <TextField variant='outlined' value={text} onChange={onTextChange} />
                );
            default:
                return 'Invalid Step';
        }
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <img src={require('../assets/images/surveyBanner.jpeg')} alt='headerimage' width='100%' height='300px' />
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='space-around' alignItems='center'>
                <Box minHeight='400px' width='800px'>
                    <div className='survey-heading'>
                        <h1>Employee Satisfaction Survey</h1>
                    </div>
                    <Stepper activeStep={activeStep} style={{ marginBottom: '30px' }}>
                        {queAns.map((queAns, index) => {
                            return (<Step key={index}><StepLabel></StepLabel></Step>);
                        })}
                    </Stepper>
                    <div>
                        {queAns.map((queAns, index) => {
                            if (activeStep === index) {
                                return (
                                    <div key={index}>
                                        <div className='question-form'>
                                            <div style={{ marginBottom: '30px' }}>
                                                <FormLabel style={{ fontSize: '1.5rem', color: '#000' }}>{queAns.question}</FormLabel>
                                            </div>
                                            <div style={{ minHeight: '200px', maxWidth: '800px' }}>
                                                {getStepperContent(activeStep)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className='stepper-nav-button' style={{ marginBottom: '40px' }}>
                        <Button className='styleButton' onClick={() => previousStep()}>Previous</Button>
                        <Button className='styleButton' onClick={() => nextStep()}>{activeStep === queAns.length - 1 ? 'Finish' : 'Next'}</Button>
                    </div>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Survey;
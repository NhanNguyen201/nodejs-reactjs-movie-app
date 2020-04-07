import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const ControlPanel = ({pauseClick, isPause, seekInput, volumnInput, played, loaded}) => {
    const classes = useStyles();
    const ValueLabelComponent = ({ children, open, value }) => {
        return (
            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} style={{fontSize: '12px', padding: '10x'}}>
                {children}
            </Tooltip>
        );
    }
    ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        open: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired,
    };
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper style={{display: 'flex', boxSizing: 'border-box', padding:'5px 20px'}} elevation={4}>
                    <Typography style={{marginRight: '10px'}}><b>Seek</b></Typography>
                    <Slider
                        ValueLabelComponent={ValueLabelComponent}
                        aria-label="Seek thumb label"
                        defaultValue={0}
                        onChangeCommitted={e => e.target.previousElementSibling ? seekInput(e) : null}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{display: 'flex', alignItems: 'center', boxSizing: 'border-box', padding:'5px 20px'}} elevation={4}>
                    <Typography style={{marginRight: '10px'}}><b>Played</b></Typography>
                    <div className={classes.root}>
                        <LinearProgress variant="buffer" value={played * 100} valueBuffer={loaded * 100} />
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{display: 'flex', boxSizing: 'border-box', padding:'5px 20px'}} elevation={4}>
                    <Typography style={{marginRight: '10px'}}><b>Volumn</b></Typography>
                    <Slider
                        ValueLabelComponent={ValueLabelComponent}
                        aria-label="Volumn thumb label"
                        defaultValue={100}
                        onChangeCommitted={e => e.target.previousElementSibling ? volumnInput(e) : null}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={pauseClick}>
                    {
                        isPause 
                        ?   <><PauseCircleOutlineIcon/><b>Pause</b></>
                        :   <><PlayCircleOutlineIcon/><b>Play</b></>
                    }
                </Button>
            </Grid>
        </Grid>
    )
}

export default ControlPanel;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button,  InputAdornment, IconButton, Input, Icon  } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
    formControl: {
        margin: 'auto',
        alignItems: 'center'
    },
    textField: {
    }
});

const SearchForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        searchText: "",
    });

    return (
        <form className={classes.formControl}>
            <Input id="search-text" className={classes.textField} placeholder="Search" variant="outlined" size="small"
                value={values.searchText} onChange={(e) => setValues({ searchText: e.target.value })} 
                endAdornment={
                    <InputAdornment position="end" size="small">
                        <Icon edge="end">
                            <SearchOutlined/>
                        </Icon>
                    </InputAdornment>
                }/>
        </form>
    );
}

export default SearchForm;
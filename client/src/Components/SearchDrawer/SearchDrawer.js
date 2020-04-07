import React, { useState, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import SearchPage from '../SeachPage/SearchPage';
import SearchIcon from '@material-ui/icons/Search';
const SearchDrawer = ({onVideoSelect}) =>  {
  const [state, setState] = useState({
    bottom: false
  });
  
  const toggleDrawer = (anchor, open) => event => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <Fragment key={'bottom'}>
        <Button onClick={toggleDrawer('bottom', true)} variant="outlined" color="primary">
            <SearchIcon/>
            Search
        </Button>
        <Drawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
        >
          <SearchPage onVideoSelect={onVideoSelect}/>
        </Drawer>
    </Fragment>
  );
}
export default SearchDrawer;
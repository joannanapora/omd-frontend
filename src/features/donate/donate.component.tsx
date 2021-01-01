import React, {useState, useEffect} from 'react';
import {Box} from 'grommet';

const DonatePage = () => {
    const [name, setName] = useState('Joanna')
    
    // useEffect(
    //     ()=>{isClicked(true)},[name]
    // );

    return (
        <Box className="donate-box" background="white" border gap="small" pad="large" width="medium">
        {name}
        {process.env.API_URL + "xd"}
        {name === "Joanna" ? 
             <div>
             <button type = 'submit' onClick={()=>setName('Adrianna')}> Change Name </button>
         </div> : <div>
         <button type = 'submit' onClick={()=>setName('Joanna')}> Change Name </button>
     </div>       
}
        </Box>
    )
}

export default DonatePage;
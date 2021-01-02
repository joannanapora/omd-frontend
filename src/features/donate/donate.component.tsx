import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';

const DonatePage = () => {
    const [name, setName] = useState('Joanna')

    return (
        <Box className="donate-box" background="white" border gap="small" pad="large" width="medium">
            {name}
            {name === "Joanna" ?
                <div>
                    <button type='submit' onClick={() => setName('Adrianna')}> Change Name </button>
                </div> : <div>
                    <button type='submit' onClick={() => setName('Joanna')}> Change Name </button>
                </div>
            }
        </Box>
    )
}

export default DonatePage;
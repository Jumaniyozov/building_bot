import React from 'react';
import { Redirect } from "react-router-dom";
import { Box } from '@admin-bro/design-system'


const Dashboard = () => {

    return (
        <Box variant="grey">
            <Box variant="white">
                <Redirect to='admin/resources/products' />
            </Box>
        </Box>
    )
}

export default Dashboard
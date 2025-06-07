import { Card, CardContent, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalesData } from '../../state/Sales/Action.js'

const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
})

const TrophyImg = styled("img")({
    right: 10,
    bottom: 20,
    height: 98,
    position: 'absolute'
})


const Achivement = () => {

    const dispatch = useDispatch();
    const { overall } = useSelector((store)=>store.sales);

    
    useEffect(() => {
        dispatch(fetchSalesData());
      }, [dispatch]);

    //   console.log("sales in achivements",overall)
    
    return (
        <Card sx={{ position: "relative" , bgcolor : "#f5f2f2", height: '100%'}}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                        Fashion Hive
                    </Typography>
                    <Typography variant='body2'>
                        Total sales !!            
                    </Typography>
                    <Typography variant='h5' sx={{my:1}}>
                    ₹{overall?.display?.totalSales}
                    </Typography>
                    {/* <Button size='small' variant='contained'>
                        View Sales
                    </Button> */}
                </div>
                <div>
                    <TriangleImg src=" "></TriangleImg>
                    <TrophyImg src="/images/achivement/trophy.png"></TrophyImg>
                </div>



            </CardContent>
        </Card>
    )
}

export default Achivement
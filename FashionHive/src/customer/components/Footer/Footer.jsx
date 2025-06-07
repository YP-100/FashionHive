import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const gettorequest = () => {
        navigate("/request");
    }
    return (
        <div>
            <Grid className=" bg-black text-white text-center mt-10 justify-evenly"
                sx={{ bgcolor: "black", color: "white", py: 3 }}
                container
            >
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <div>
                        <Typography className="pb-5" variant="h6"
                            sx={{ fontWeight: "bold" }}>
                            Company
                        </Typography>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            About
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Blog
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Our Team
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Contact Us
                        </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <div>
                        <Typography className="pb-5" variant="h6"
                            sx={{ fontWeight: "bold" }}>
                            Solutions
                        </Typography>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Marketing
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Analytics
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Commerce
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Support
                        </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <div>
                        <Typography className="pb-5" variant="h6"
                            sx={{ fontWeight: "bold" }}>
                            Documentation
                        </Typography>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            Guides
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" onClick={gettorequest}>
                            API Status
                        </Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <div>
                        <Typography className="pb-5" variant="h6"
                            sx={{ fontWeight: "bold" }}>
                            Help Us To Improve
                        </Typography>
                        <Button className="pb-5" variant="h6" onClick={() => navigate("/feedback")}>
                            FeedBack
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Grid className="pt-10 mt-0 bg-black text-white" size={{ xs: 12 }}>
                    <Typography  component="p" variant="body2" align="center"
                        sx={{ fontWeight: "bold" }}>
                        &copy; 2025 FashionHive. All rights reserved.
                    </Typography>
                    <Typography  component="p" variant="body2" align="center">
                        Made By : Yash Palav
                    </Typography>
                    <Typography  component="email" variant="body1" align="center">
                        Contact : <a href="mailto:yashpalav68@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>yashpalav68@gmail.com</a>
                    </Typography>
                </Grid>
                
        </div>
    );
};

export default Footer;

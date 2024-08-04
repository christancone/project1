import './DaycareDetails.css';

import { styled } from '@mui/material/styles';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#AD88C6', // Filled star color
    },
    '& .MuiRating-iconHover': {
        color: '#AD88C6', // Hover color (if not read-only)
    },
    '& .MuiRating-iconEmpty': {
        color: '#d3d3d3', // Empty star color (optional)
    },
});


const DaycareDetails = () => {
    return (
        <div className="details">
            <div className="content">
                <h1>Daycare Details</h1>
                <h2>Near, Your Place ...........</h2>
                <div className="content1">
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2212940274276!2d81.07679557590842!3d6.983191417648854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4618a1a9fec37%3A0x1dd900702229654b!2sUva%20Wellassa%20University%20of%20Sri%20Lanka!5e0!3m2!1sen!2suk!4v1718198261657!5m2!1sen!2suk"
                            width="100%"
                            height="400px"
                            style={{ border: "0" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="content2">
                    <div className="rec1">
                        <h3>Diva Daycare</h3>
                        <p>
                            Diva Daycare offers a nurturing and educational environment for children aged 6 months to 5 years.
                            Our experienced staff provides personalized care, fostering each child's growth and development through engaging activities and a structured curriculum. With a focus on safety, creativity, and social skills, we ensure a positive and enriching experience for every child. Parents can trust Diva Daycare for reliable, high-quality childcare in a loving atmosphere.
                        </p>
                        <div className="rating">
                            <h5>Common Review</h5>
                            <p>
                                <Stack spacing={1}>
                                    <CustomRating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                </Stack>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="content2">
                    <div className="rec1">
                        <h3>Toe Daycare</h3>
                        <p>
                            Toe Daycare offers a nurturing and educational environment for children aged 6 months to 5 years.
                            Our experienced staff provides personalised care, fostering each child's growth and development through engaging activities and a structured curriculum.
                            With a focus on safety, creativity, and social skills, we ensure a positive and enriching experience for every child. Parents can trust Diva Daycare for reliable, high-quality childcare in a loving atmosphere.
                        </p>
                        <div className="rating">
                            <h5>Common Review</h5>
                            <p>
                                <Stack spacing={1}>
                                    <CustomRating name="half-rating-read" defaultValue={2.5} precision={4} readOnly />
                                </Stack>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="content2">
                    <div className="rec1">
                        <h3>Tiny Daycare</h3>
                        <p>
                            Tiny Daycare offers a nurturing and educational environment for children aged 6 months to 5 years.
                            Our experienced staff provides personalized care, fostering each child's growth and development through engaging activities and a structured curriculum. With a focus on safety, creativity, and social skills, we ensure a positive and enriching experience for every child. Parents can trust Diva Daycare for reliable, high-quality childcare in a loving atmosphere.
                        </p>
                        <div className="rating">
                            <h5>Common Review</h5>
                            <p>
                                <Stack spacing={1}>
                                    <CustomRating name="half-rating-read" defaultValue={2.5} precision={1.5} readOnly />
                                </Stack>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DaycareDetails;
import React, { useEffect, useState } from 'react';
import './Statistics.scss';
import { axiosSecure } from '../../../../api/axios';
import CountUp from 'react-countup';

import monitorImg from "../../../../assests/accImg/monitorImg.png";
import mouseImg from "../../../../assests/accImg/mouseImg.png";
import headphoneImg from "../../../../assests/accImg/headphoneImg.png";
import keyboardImg from "../../../../assests/accImg/keyboardImg.png";
import dongleImg from "../../../../assests/accImg/dongleImg.png";
import laptopImg from "../../../../assests/accImg/laptopImg.png";
 
const StatisticsOne = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axiosSecure.get('/product', {
                    headers: {
                        Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
                    },
                });
                setProducts(response.data.products);
            } catch (err) {
                console.error(err);
            }
        };

        getAllProducts();
    }, []);

    const productTypes = [
        { type: 'Monitor', image: monitorImg },
        { type: 'Mouse', image: mouseImg },
        { type: 'Headphone', image: headphoneImg },
        { type: 'Keyboard', image: keyboardImg },
        { type: 'USBDongle', image: dongleImg },
        { type: 'Laptop', image: laptopImg }
    ];

    const calculateTotals = (type) => {
        const productList = products.filter(p => p.productType.toLowerCase() === type.toLowerCase());
        const total = productList.length;
        const assigned = productList.filter(p => p.tag === 'assigned').length;
        const notAssigned = total - assigned;
        return { total, assigned, notAssigned };
    };

    return (
        <section className='design-card-section'>
            {productTypes.map(({ type, image }) => {
                const { total, assigned, notAssigned } = calculateTotals(type);

                return (
                    <div
                        key={type}
                        className='card-for-items'
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <h4 className='mb-4'>{type}</h4>

                        <b>Total: <span className='bg-primary px-2 rounded-1'>
                            <CountUp start={-50} end={total} duration={1} />
                        </span></b>

                        <b>In Stock: <span className='bg-success px-1 rounded-1'>
                            <CountUp start={-50} end={notAssigned} duration={1} />
                        </span></b>

                        <b>Assigned: <span className='bg-secondary px-1 rounded-1'>
                            <CountUp start={-50} end={assigned} duration={1} />
                        </span></b>
                    </div>
                );
            })}
        </section>
    );
};

export default StatisticsOne;

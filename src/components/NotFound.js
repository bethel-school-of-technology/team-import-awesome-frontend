import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/not-found.css';

const NotFound = () => {
    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
        setPageX(document.documentElement.clientWidth);
        setPageY(document.documentElement.clientHeight);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Vertical Axis
            setMouseY(event.pageY);
            const yAxis = ((pageY / 2 - mouseY) / pageY) * 300;

            // Horizontal Axis
            setMouseX(event.pageX / -pageX);
            const xAxis = -mouseX * 100 - 100;

            const eyesStyle = {
                transform: `translate(${xAxis}%, -${yAxis}%)`,
            };
            document.querySelector('.box__ghost-eyes').style.transform =
                eyesStyle.transform;
        };

        setPageX(document.documentElement.clientWidth);
        setPageY(document.documentElement.clientHeight);

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [pageX, pageY, mouseX, mouseY]);

    return (
        <div className="not-found-body">
            <div className="box">
                <div className="box__ghost">
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>

                    <div className="box__ghost-container">
                        <div className="box__ghost-eyes">
                            <div className="box__eye-left"></div>
                            <div className="box__eye-right"></div>
                        </div>
                        <div className="box__ghost-bottom">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="box__ghost-shadow"></div>
                </div>

                <div className="box__description">
                    <div className="box__description-container">
                        <div className="box__description-title">Whoops!</div>
                        <div className="box__description-text">
                            It seems like we couldn't find the page you were
                            looking for
                        </div>
                    </div>

                    <Link to={'/'} className="box__button">
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

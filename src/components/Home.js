import { Carousel } from 'react-bootstrap';
import '../css/home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState('');

    useEffect(() => {
        axios
            .get('https://type.fit/api/quotes')
            .then((response) => {
                const data = response.data;
                setQuotes(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentQuote(data[randomIndex].text);
                setCurrentAuthor(data[randomIndex].author);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex].text);
            setCurrentAuthor(quotes[randomIndex].author);
        }, 10000);
        return () => clearInterval(interval);
    }, [quotes]);

    return (
        <div>
            <div>
                <Carousel className="carousel">
                    <Carousel.Item>
                        <img
                            className="d-block img-fluid"
                            src="/assets/jump.png"
                            alt="Serious Side Steps"
                            alignItems="center"
                        />

                        <Carousel.Caption className="carousel-text">
                            <h3>Boost Your Cardio Endurance</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block img-fluid"
                            src="/assets/yum.png"
                            alt="I am now hungry"
                            alignItems="center"
                        />

                        <Carousel.Caption className="carousel-text">
                            <h3>Increase Your Energy</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block img-fluid"
                            src="/assets/yoga.png"
                            alt="Yoga Girl"
                            alignItems="center"
                        />

                        <Carousel.Caption className="carousel-text">
                            <h3>Improve Your Flexiblity</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item class="slides">
                        <img
                            className="d-block img-fluid"
                            src="/assets/weight.png"
                            alt="Weights"
                            alignItems="center"
                        />

                        <Carousel.Caption className="carousel-text">
                            <h3>Prioritize Recovery Days</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item class="slides">
                        <img
                            className="d-block img-fluid"
                            src="/assets/shoe.png"
                            alt="Hikers"
                            alignItems="center"
                        />

                        <Carousel.Caption className="carousel-text">
                            <h3>Start a Walking Program</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="mt-5">
                {/* Insiprational Quote */}
                <div className="inspo">
                    <h4>"{currentQuote}"</h4>
                    <h5>{currentAuthor}</h5>
                </div>
                {/* ABOUT */}
                <div className="row homerows rowodd" id="ABOUT">
                    <div className="col-md-6 col-sm-12 my-auto homediv">
                        <h3>About Us</h3>
                        <p>
                            Welcome to Goal Getters! We are a team of four
                            talented coders who share a passion for fitness and
                            technology. Our mission is to help people achieve
                            their fitness goals by providing them with a
                            powerful and intuitive tool that can track their
                            progress and motivate them to stay on track. We
                            understand that setting and achieving fitness goals
                            can be a challenging task, and that's why we
                            designed Goal Getters to be simple, yet effective.
                            With our app, users can create customized fitness
                            plans, set realistic goals and track their progress.
                            Our team is committed to providing our users with
                            the best possible experience, and we are constantly
                            working to improve Goal Getters by adding new
                            features and enhancing its performance.
                        </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img
                            className=" rightimg"
                            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhlYWx0aHklMjBhY3Rpdml0aWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                            alt="Walking up steps"
                        />
                    </div>
                </div>
                {/* WHY */}
                <div className="row homerows" id="WHY">
                    <div className="col-md-6 col-sm-12">
                        <img
                            className=" leftimg"
                            src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                            alt="Tossing a phone"
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 my-auto mx-auto homediv">
                        <h3>Why GoalGetters?</h3>
                        <p>
                            Are you tired of setting fitness goals that you
                            struggle to achieve? Do you find yourself losing
                            motivation or not knowing where to start with your
                            workout routine? Then it's time to try Goal Getters!
                            Our app is the ultimate tool for anyone looking to
                            set and achieve their fitness goals. Here's why you
                            should use Goal Getters: Personalization: We
                            understand that everyone's fitness journey is
                            unique, and that's why our app is designed to be
                            personalized to your individual needs and goals.
                            With Goal Getters, you can create a fitness plan
                            that is tailored to your specific goals,
                            preferences, and fitness level. Motivation and
                            support: We believe that fitness is a journey, and
                            that's why we provide our users with the motivation
                            and support they need to stay committed to their
                            goals. With Goal Getters, you'll receive a community
                            of like-minded individuals to help you stay
                            motivated. Convenience: With Goal Getters, you can
                            access your personalized fitness plan and track your
                            progress from anywhere, at any time. Whether you're
                            at home, at the gym, or on-the-go, our app makes it
                            easy to stay on top of your fitness goals. Don't let
                            another day go by without taking control of your
                            fitness journey. With Goal Getters, you have
                            everything you need to set, achieve, and exceed your
                            fitness goals. Try it today and see the results for
                            yourself!
                        </p>
                    </div>
                </div>
                {/* HOW */}
                <div className="row homerows rowodd" id="HOW">
                    <div className="col-md-6 col-sm-12 m-auto homediv">
                        <h3>How It Works</h3>
                        <p>
                            Goal Getters is a user-friendly site that makes
                            setting and achieving fitness goals easier than ever
                            before. Here's how it works:
                        </p>

                        <ol>
                            <li>
                                Set your fitness goals: Start by creating a
                                personalized fitness goal that is tailored to
                                your needs, whether it's to lose weight, gain
                                muscle, or simply stay in shape.{' '}
                            </li>

                            <li>
                                Make a Plan: Use Goal Getters to make a plan and
                                set a timeframe. Our site will help you stay
                                motivated by displaying your goal and plan in an
                                easy-to-read format, so you can see how far
                                you've come and how much closer you are to
                                reaching your goals.
                            </li>

                            <li>
                                Celebrate your achievements: As you reach
                                milestones and achieve your fitness goals, Goal
                                Getters will celebrate your achievements and
                                keep you motivated to continue pushing yourself
                                to new heights.
                            </li>
                        </ol>
                        <p>
                            With Goal Getters, you have everything you need to
                            make your fitness goals a reality. Our site is
                            designed to help you stay on track, stay motivated,
                            and stay committed to your fitness journey.
                        </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img
                            className="rightimg"
                            src="https://plus.unsplash.com/premium_photo-1681487975579-3cb90dbe46a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                            alt="Gears working"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

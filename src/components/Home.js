import { Carousel } from "react-bootstrap";
import '../css/home.css'
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {

    const [ quotes, setQuotes ] = useState([]);
    const [ currentQuote, setCurrentQuote ] = useState('');
    const [ currentAuthor, setCurrentAuthor ] = useState('');

    useEffect(() => {
        axios.get('https://type.fit/api/quotes')
            .then(response => {
                const data = response.data;
                setQuotes(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentQuote(data[randomIndex].text);
                setCurrentAuthor(data[randomIndex].author);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          setCurrentQuote(quotes[randomIndex].text);
          setCurrentAuthor(quotes[randomIndex].author);
        }, 10000);
        return () => clearInterval(interval);
      }, [quotes]);

    return (
        <>
        {/* carousel */} 
            <Carousel fade className="m-auto mt-5">
                <Carousel.Item>
                    <img height={300} width={420}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1608138278545-366680accc66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Serious Side Steps"
                    
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={300} width={420}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    alt="I am now hungry"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={300} width={420}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80"
                    alt="Yoga Girl"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={300} width={420}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                    alt="Salad Bowl"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={300} width={420}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1551384955-233da563a9bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGlrZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                    alt="Hikers"
                    />
                </Carousel.Item>
            </Carousel>

            <div className="mt-5">
            {/* Insiprational Quote */}
                <div className="inspo">
                    <h4>"{currentQuote}"</h4>
                    <h5>{currentAuthor}</h5>
                </div>
            {/* ABOUT */}
                <div className="row homerows rowodd" id="ABOUT">
                    <div className="col-6 my-auto homediv">
                        <h3>About Us</h3>
                        <p>Lorem ipsum but what if I add just a little bit more stuff here like what does 
                            this look like with a lot more typed?</p>
                    </div>

                    <div className="col-6">
                        <img className="w-75 rightimg" 
                        src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhlYWx0aHklMjBhY3Rpdml0aWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" 
                        alt="Walking up steps"
                        />
                    </div>
                </div>
            {/* WHY */}
                <div className="row homerows" id="WHY">
                    <div className="col-6">
                        <img className="w-75 leftimg" 
                        src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" 
                        alt="Tossing a phone" 
                        />
                    </div>

                    <div className="col-6 my-auto mx-auto homediv">
                        <h3>Why GoalGetters?</h3>
                        <p>Just Because</p>
                    </div>
                </div>
            {/* HOW */}
                <div className="row homerows rowodd" id="HOW">
                    <div className="col-6 m-auto homediv">
                        <h3>How It Works</h3>
                        <p>We explained earlier</p>
                    </div>

                    <div className="col-6">
                        <img className="w-75 rightimg" 
                        src="https://plus.unsplash.com/premium_photo-1681487975579-3cb90dbe46a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                        alt="Gears working"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

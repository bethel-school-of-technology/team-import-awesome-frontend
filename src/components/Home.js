import { Carousel } from "react-bootstrap";
import '../css/home.css'

const Home = () => {
    return (
        <>
        {/* carousel */}
            
            <Carousel fade className="m-auto mt-5">
                <Carousel.Item>
                    <img height={800}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1608138278545-366680accc66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Serious Side Steps"
                    
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={800}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    alt="I am now hungry"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img height={800}
                    className="d-block mx-auto"
                    src="https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80"
                    alt="Yoga Girl"
                    />
                </Carousel.Item>
            </Carousel>
            
        {/* About */}
            <div>
                <div>
                    <h3>About Us</h3>
                    <p>Lorem ipsum</p>
                </div>

                <div>
                    <p>cool image</p>
                </div>
            </div>
        {/* WHY */}
            <div>
                <div>
                    <h3>Why GoalGetters?</h3>
                    <p>Just Because</p>
                </div>

                <div>
                    <p>Another Image</p>
                </div>
            </div>
        {/* How */}
            <div>
                <div>
                    <h3>How It Works</h3>
                    <p>We explained earlier</p>
                </div>

                <div>
                    <p>Last cool image</p>
                </div>
            </div>
        </>
    );
};

export default Home;

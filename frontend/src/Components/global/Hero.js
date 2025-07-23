
const Hero = () => {
  return (
    <div className="container-fluid">
      <div className=" bg-info-subtle row align-items-center pt-4" style={{ height: "90vh" }}>
       
        <div className="col-md-6 order-1 order-md-2 text-center">
          <img
            src="images/hero.png"
            alt="Attendance Illustration"
            className="img-fluid"
            style={{ maxHeight: "70vh" }}
          />
        </div>

      
        <div className="col-md-6 order-2 order-md-1 p-5 text-dark">
          <h1 className="display-4 fw-bold">
            TrackIT: A New Way to <br /> Take Attendance
          </h1>
          <p className="lead mt-3">
            A simple and smart way of taking attendance with the help of technology and innovation in the modern world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

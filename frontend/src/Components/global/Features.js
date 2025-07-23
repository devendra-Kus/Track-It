
const Features = () => {
   return (
      <div className="container-fluid p-4"   >

         <div className="row my-4 bg-light">
            <div className="col-sm-12 col-md-6 d-flex justify-content-center">
               <img className="img-fluid mt-2" src="images/problem.png" alt="Problem " style={{ width: "60vh" }} />
            </div>
            <div className="col-sm-12 col-md-6 d-flex align-items-center" >
               <h3 className="fw-bold fs-1 text-start">Attendance is required at schools and institutions :
                  <p className="fw-lighter fs-4">Consistent attendance improves academic performance, builds discipline,
                     and fosters better social interactions among students</p></h3>
            </div>
         </div>


         <div className="row  mt-4 bg-light">
            <h2 className="fs-2 " style={{
               backgroundImage: 'linear-gradient(to right, rgb(0, 119, 255), rgb(0, 255, 13))', WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               MozBackgroundClip: 'text',
               MozTextFillColor: 'transparent',
            }}>--Features of Our Application---</h2>

            <div className="col-sm-12 col-md-6 d-flex align-items-center p-4" >
               <h3 className=" fw-bold fs-3 text-start">Qr based Attendence tracking :
                  <p className="fw-lighter fs-6 mt-2">Effortlessly manage attendance with QR code scanning. Track location, date, and time of every entry. Streamline records for admins and users in real-time.</p></h3>
            </div>
            <div className="col-sm-12 col-md-6 mb-4 d-flex justify-content-center">
               <img className="img-fluid mt-2 " src="images/QR.png" alt="Person with QR" style={{ width: "70vh" }} />
            </div>

            <div className="col-sm-12 col-md-6 mt-4 d-flex justify-content-center">
               <img className="img-fluid mt-2 " src="images/at2.jpeg" alt="Check Attendence" style={{ width: "70vh" }} />
            </div>
            <div className="col-sm-12 col-md-6 d-flex align-items-center" >
               <h3 className="fw-bold fs-3 text-start">Check Attendence and Report :
                  <p className="fw-lighter fs-6">Mark attendance instantly by scanning QR codes with location, date, and time. Users can view their attendance history and detailed reports. Admins manage users and monitor attendance records in real-time.</p></h3>
            </div>



            <div className="col-sm-12 col-md-6 mt-5 d-flex align-items-center" >
               <h3 className="fw-bold fs-3 text-start">Leave Management :
                  <p className="fw-lighter fs-6">Users can easily apply for leave through the system. Admins receive leave requests and can approve or reject them. This streamlines the leave approval process efficiently.</p></h3>
            </div>
            <div className="col-sm-12 col-md-6 mt-4 d-flex justify-content-center">
               <img className="img-fluid my-2 " src="images/at3.webp" alt="leave" style={{ width: "70vh" }} />
            </div>

            <div className="col-sm-12 col-md-6 mt-4 d-flex justify-content-center">
               <img className="img-fluid my-2 " src="images/admin.png" alt="Dashboard" style={{ width: "70vh" }} />
            </div>

            <div className="col-sm-12 col-md-6 mt-5 d-flex align-items-center" >
               <h3 className="fw-bold fs-3 text-start">Admin Dashboard & User Management:
                  <p className="fw-lighter fs-6 mt-2">Admins manage <b> multiple batches</b> and their users with ease. They can add, update, or remove users as needed. This helps maintain organized batch-wise attendance.</p></h3>
            </div>


            <div className="col-sm-12 col-md-6 mt-5 d-flex align-items-center" >
               <h3 className="fw-bold fs-3 text-start">Holiday Management :
                  <p className="fw-lighter fs-6">Admins can declare holidays for different batches in the system. Holidays are reflected automatically in attendance reports. This keeps the system updated with official off days.</p></h3>
            </div>
            <div className="col-sm-12 col-md-6 mt-4 d-flex justify-content-center">
               <img className="img-fluid my  -2 " src="images/holi2.png" alt="Holiday" style={{ width: "70vh" }} />
            </div>
         </div>
      </div>
   );
}
export default Features;
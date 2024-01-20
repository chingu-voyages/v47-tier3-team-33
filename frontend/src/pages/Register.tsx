import '../css/login.css';
const Register = () => {
    return (
    <div className="form">
    
        <ul className="tab-group">
            <li className="tab active"><a href="#signup">Sign Up</a></li>
            <li className="tab"><a href="login">Log In</a></li>
        </ul>
        <div className="tab-content">
            <div id="signup">   
                <h1>Sign Up for Free</h1>
            
                <form action="/" method="post">
            
                    {/* <div className="top-row"> */}
                    <div className="">
                        <div className="field-wrap">
                            <label>
                            First Name<span className="req">*</span>
                            </label>
                            <input type="text" required/>
                        </div>
                
                        <div className="field-wrap">
                            <label>
                                Last Name<span className="req">*</span>
                            </label>
                            <input type="text"required />
                        </div>
                    </div>
                    <div className="field-wrap">
                        <label>Email Address<span className="req">*</span></label>
                        <input type="email"required/>
                    </div>
                    <div className="field-wrap">
                        <label> Set A Password<span className="req">*</span></label>
                        <input type="password"required/>
                    </div>
                    <button type="submit" className="button button-block">Get Started</button>
                </form>
            </div>

            <div>
                <hr/>
            </div>
        </div>
    </div>
    );
};

export default Register;

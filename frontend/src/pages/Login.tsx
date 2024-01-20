import '../css/login.css';
const Login = () => {
    return (
    <div className="form">
        <ul className="tab-group">
            <li className="tab active"><a href="register">Sign Up</a></li>
            <li className="tab"><a href="login">Log In</a></li>
        </ul>
        <h1 className="text-green-300 text-xs">Welcome Back!</h1>
        <form action="/" method="post">
            <div className="field-wrap">
            <label>Email Address<span className="req">*</span></label>
            <input type="email"required/>
            </div>
            <div className="field-wrap">
            <label>Password<span className="req">*</span></label>
            <input type="password"required/>
            </div>
            <p className="forgot"><a href="#">Forgot Password?</a></p>
            <button className="button button-block">Log In</button>
        </form>
    </div>
    );
};

export default Login;
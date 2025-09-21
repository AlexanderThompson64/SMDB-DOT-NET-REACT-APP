const Navbar = () => {
    return (
        <div className="sticky-top shadow-sm">
            {/* Top slim navbar */}
            <nav className="navbar bg-dark text-light py-0">
                <div className="container-fluid d-flex justify-content-end bg-secondary py-2">
                    <small className="text-uppercase fw-bold lh-1 pb-1">
                        Alexander Thompson
                    </small>
                </div>
            </nav>

            {/* Main navbar */}
            <nav className="navbar navbar-expand-lg bg-white py-3 border-bottom">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">
                        SMDB React App
                    </a>
                    <span className="navbar-brand fw-bold">
                        Powered by .NET
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

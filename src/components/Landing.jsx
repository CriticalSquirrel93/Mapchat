/*
Description:
    Landing component for the application's landing page.
Usage:
    - Renders a hero section with a call-to-action button to join.
    - Highlights key features of the application.
Credit:
    * Ash
*/
export function Landing() {
    return (
        <>
            {/* Main container */}
            <div className="container">
                {/* Hero section */}
                <section className="hero text-center py-5">
                    <div className="container">
                        <h2>Discover Local Meetups with MapChat</h2>
                        <p>Connect with people in your community, set up meetups, and explore your city like never before.</p>
                        <a href="/login" className="btn btn-primary">Join Now</a>
                    </div>
                </section>
                {/* Features section */}
                <section id="features" className="features text-center py-5">
                    <div className="container">
                        <div className="row">
                            {/* Feature: Find Nearby Meetups */}
                            <div className="col-sm-4">
                                <i className="bi bi-geo-alt mb-3" style={{ fontSize: 10 + 'rem' }}></i>
                                <h3>Find Nearby Meetups</h3>
                                <p>Mapchat helps you discover interesting local events and activities happening in your area.</p>
                            </div>
                            {/* Feature: Organize Your Meetups */}
                            <div className="col-sm-4">
                                <i className="bi bi-people mb-3" style={{ fontSize: 10 + 'rem' }}></i>
                                <h3>Organize Your Meetups</h3>
                                <p>Create your own meetup events and invite others to join, making it easy to connect with like-minded people.</p>
                            </div>
                            {/* Feature: Stay Connected */}
                            <div className="col-sm-4">
                                <i className="bi bi-chat-dots mb-3" style={{ fontSize: 10 + 'rem' }}></i>
                                <h3>Stay Connected</h3>
                                <p>Keep in touch with your local community and make new friends who share your interests.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

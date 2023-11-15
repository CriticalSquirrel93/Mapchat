import { Sidebar } from "./Sidebar";
import { Feed } from "./Feed";

export function Homepage() {
    return (
        <>
            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="col col-3">
                            <Sidebar />
                        </div>
                        <div className="col col-6">
                            <Feed />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
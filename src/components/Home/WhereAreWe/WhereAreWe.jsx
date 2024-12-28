import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Location from "./images/location.png";

import "./css/WhereAreWe.css";


function WhereAreWe() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAjIKJOkQmpMmircU-4qMVYawmkU0aBV24",
    });

    const center = { lat: 48.5, lng: 22.5 };

    const locations = [
        { lat: 48.6037027, lng: 22.268748, address: "вулиця Генерала Петрова, 48В, Мукачево" },
        { lat: 48.4527839, lng: 22.7055641, address: "вулиця Возз'єднання, 8/а, Мукачево" },
        { lat: 48.442871, lng: 22.7182153, address: "вулиця Легоцького, 80 (ЖК \"PARKLAND\"), Ужгород" },
    ];

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <section className="WhereAreWe-block">
            <div className="WhereAreWe-map">
                <GoogleMap
                    mapContainerClassName="google-map-container"
                    zoom={10}
                    center={center}
                >
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={{ lat: location.lat, lng: location.lng }}
                        />
                    ))}
                </GoogleMap>
            </div>
            <div className="WhereAreWe-content">
                <h1 className="WhereAreWe-content__h1">Де нас знайти?</h1>
                <p className="WhereAreWe-content__p">
                    Відвідайте нас за однією з цих адрес, щоб отримати консультацію, зробити замовлення або просто завітати. Ми завжди раді вам допомогти:
                </p>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location" />
                    <p>вулиця Генерала Петрова, 48В, Мукачево</p>
                </article>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location" />
                    <p>вулиця Возз'єднання, 8/а, Мукачево</p>
                </article>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location" />
                    <p>вулиця Легоцького, 80 (ЖК "PARKLAND"), Ужгород</p>
                </article>
            </div>
        </section>
    );
}

export default WhereAreWe;

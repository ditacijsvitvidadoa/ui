export default function FavoritesIcon({
                                          fill = '#292929',
                                          className = '',
                                          onClick
                                      }) {
    return (
        <svg
            viewBox="0 0 30 26"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ fill: fill }}
            onClick={onClick}
        >
            <path d="M0 8.77828C0 16.0726 6.02914 19.9597 10.4426 23.439C12 24.6667 13.5 25.8226 15 25.8226C16.5 25.8226 18 24.6667 19.5574 23.439C23.9709 19.9597 30 16.0726 30 8.77828C30 1.48387 21.7497 -3.68917 15 3.32358C8.25024 -3.68917 0 1.48387 0 8.77828Z" />
        </svg>
    );
}

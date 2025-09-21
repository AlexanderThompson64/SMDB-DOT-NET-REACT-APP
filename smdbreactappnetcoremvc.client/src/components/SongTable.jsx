import { useState, useEffect } from 'react';

const SongTable = ({ token }) => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [genre, setGenre] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const genres = [
        { label: "All Genres", value: "" },
        { label: "Indie", value: "indie" },
        { label: "Rock", value: "rock" },
        { label: "Pop", value: "pop" }
    ];

    useEffect(() => {
        const fetchSongs = async () => {
            setIsLoading(true);
            try {
                let url = "/api/songs";
                if (genre) {
                    url += `?genre=${encodeURIComponent(genre)}`;
                }

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSongs(data || []);
            } catch (err) {
                setError(`Error: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, [genre, token]);

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2 className="h4 mb-4">Song List</h2>
                
                <div className="mb-3">
                    <label htmlFor="genreSelect" className="form-label fw-bold">
                        Filter by genre:
                    </label>
                    <select
                        id="genreSelect"
                        className="form-select"
                        value={genre}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genreOption) => (
                            <option key={genreOption.label} value={genreOption.value}>
                                {genreOption.label}
                            </option>
                        ))}
                    </select>
                </div>

                {isLoading ? (
                    <div className="text-center py-4">Loading songs...</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : songs.length === 0 ? (
                    <p>No songs found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song, index) => {
                                    const key = song.id ?? index;
                                    const title = song.name || "Unknown Title";
                                    const artist = song.artistName || "Unknown Artist";
                                    const songGenre = song.genre || "Unknown Genre";

                                    return (
                                        <tr key={key}>
                                            <td>{title}</td>
                                            <td>{artist}</td>
                                            <td>{songGenre}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SongTable;
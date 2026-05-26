import React from "react";
import "./Header.css";

const Header = ({ performance }) => {
    if (!performance) return null;

    const hasPhoto = Boolean(performance.memberPhoto);

    return (
        <div className="performance-hero">

            <div className="performance-overlay">

                <div className="performance-content">

                    {/* PHOTO */}
                    <div className="performance-photo">
                        {hasPhoto ? (
                            <img
                                src={performance.memberPhoto}
                                alt={performance.name}
                                loading="lazy"
                            />
                        ) : (
                            <div className="photo-placeholder">
                                {performance.name?.charAt(0) || "?"}
                            </div>
                        )}
                    </div>

                    {/* MAIN */}
                    <div className="performance-main">

                        <div className="performance-category">
                            {performance.category?.name}
                        </div>

                        <h1 className="performance-title">
                            {performance.name}
                        </h1>

                        <div className="performance-description">
                            {performance.description}
                        </div>

                    </div>

                    {/* META */}
                    <div className="performance-meta">

                        <div className="performance-meta-card">
                            <div className="meta-label">Participant</div>
                            <div className="meta-value">
                                {performance.fullName}
                            </div>
                        </div>

                        <div className="performance-meta-card">
                            <div className="meta-label">Place</div>
                            <div className="meta-value">
                                {performance.place}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Header;
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Youtube } from 'lucide-react';
import './VideoPlayerModal.css';

export default function VideoPlayerModal({ resource, onClose }) {
    // Close on ESC key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!resource) return null;

    const embedUrl = resource.videoId
        ? `https://www.youtube-nocookie.com/embed/${resource.videoId}?autoplay=1&rel=0&modestbranding=1`
        : null;

    return (
        <AnimatePresence>
            <div className="video-modal-backdrop" onClick={onClose}>
                <motion.div
                    className="video-modal-container"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                    {/* Header */}
                    <div className="video-modal-header">
                        <div className="video-modal-title-row">
                            <Youtube size={18} color="#FF0000" />
                            <h3 className="video-modal-title">{resource.title}</h3>
                        </div>
                        <div className="video-modal-actions">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer"
                                className="video-ext-btn" title="Open on YouTube">
                                <ExternalLink size={14} /> YouTube
                            </a>
                            <button className="video-close-btn" onClick={onClose} aria-label="Close">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="video-modal-player">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={resource.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                loading="lazy"
                            />
                        ) : (
                            /* No videoId — show search redirect */
                            <div className="video-no-embed">
                                <Youtube size={48} color="#FF0000" />
                                <h3>Video Search</h3>
                                <p>This topic search will open on YouTube. Click below to watch.</p>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer"
                                    className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    <Youtube size={16} /> Open YouTube Search
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {resource.duration && (
                        <div className="video-modal-footer">
                            ⏱ Duration: {resource.duration} &nbsp;·&nbsp; Press <kbd>Esc</kbd> to close
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

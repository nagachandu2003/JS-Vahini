import React from 'react';
import './index.css';
import Footer from '../../Footer';

const Trainings = () => {
  // Sample video data
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/lpjAUbKWG10',
      title: 'Sample Video',
      description: 'This is the description for the sample video.',
    },
  ];

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-heading'>Trainings</h1>
        </div>
        <div className='trainings-main-container'>
          <div className="trainings-video-list">
            {videos.map((video) => (
              <div key={video.id} className="trainings-video-item">
                <iframe
                  width="95%"
                  height="150"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Trainings;

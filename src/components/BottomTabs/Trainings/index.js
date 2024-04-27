import React from 'react';
import './index.css';

const Trainings = () => {
  // Sample video data
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 1',
      description: 'This is the description for Sample Video 1.',
    },    
    {
      id: 2,
      url: 'https://www.youtube.com/embed/niY3AHpQPyw',
      title: 'Sample Video 2',
      description: 'This is the description for Sample Video 2.',
    },
    {
      id: 3,
      url: 'https://www.youtube.com/embed/WofOYYJs6LQ',
      title: 'Sample Video 3',
      description: 'This is the description for Sample Video 3.',
    },
    {
      id: 4,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 4',
      description: 'This is the description for Sample Video 4.',
    },
    {
      id: 5,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 5',
      description: 'This is the description for Sample Video 5.',
    },
    {
      id: 6,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 6',
      description: 'This is the description for Sample Video 6.',
    },
    {
      id: 7,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 7',
      description: 'This is the description for Sample Video 7.',
    },
    {
      id: 8,
      url: 'https://www.youtube.com/embed/mz4MlQ-L9U4',
      title: 'Sample Video 8',
      description: 'This is the description for Sample Videos 8.',
    },
  ];

  return (
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
  );
};

export default Trainings;

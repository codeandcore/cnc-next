import React from 'react';

const VisionImage = ({ a_vision_background_image }) => {
  return (
    <>
      {a_vision_background_image && (
        <div className="vision_background">
          <div
            className="bg"
            style={{ backgroundImage: `url(${a_vision_background_image.url})` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default VisionImage;

import React from 'react';
import he from 'he'; 

const NewLook = ({ a_nlook_title, a_nlook_content }) => {
  return (
    <div className='new_look'>
      <div className='wrapper d_flex d_flex_at'>
        <h2>{a_nlook_title}</h2>
        <div className='text'>
          <p dangerouslySetInnerHTML={{ __html: he.decode(a_nlook_content) }}></p>
        </div>
      </div>
    </div>
  );
};

export default NewLook;

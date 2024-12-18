import React from 'react';
import OurEmployeeExperience from './OurEmployeeExperience';
import OurTechnologyStack from './OurTechnologyStack';

const OurEmployeeandtech = ({
  a_left_side_section_title,
  employee_experience_detail,
  a_right_side_section_title,
  technology_stack,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish
}) => {
  return (
    <div className='our_employee_sec'>
      <div className="wrapper d_flex d_flex_at">
        <OurEmployeeExperience
          a_left_side_section_title={a_left_side_section_title}
          employee_experience_detail={employee_experience_detail}
        />
        <OurTechnologyStack
          a_right_side_section_title={a_right_side_section_title}
          technology_stack={technology_stack}
          setPrefetchedData={setPrefetchedData}
          setIsLoading={setIsLoading}
          setIsDone={setIsDone}
          setIsFinish={setIsFinish}
        />
      </div>                         
    </div>
  );
};

export default OurEmployeeandtech;

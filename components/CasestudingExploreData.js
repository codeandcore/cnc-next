import React from 'react';
import ExploreData from './ExploreData';
import Image from 'next/image';
import loader from "../public/images/rotate-right.png"

const CasestudingExploreData = ({ CaseStudycptData, onLoadMore, hasMorePages, setPrefetchedData, setIsLoading, setIsDone, setIsFinish, isLoadk }) => {
  return (
    <>
      {CaseStudycptData &&
        <div className="casestuding_exploredata">
          <div className="wrapper">
            <ExploreData
              CaseStudycptData={CaseStudycptData}
              setPrefetchedData={setPrefetchedData}
              setIsLoading={setIsLoading}
              setIsDone={setIsDone}
              setIsFinish={setIsFinish}
            />
            <span className="loaderdata" style={{ display: isLoadk ? 'inline-block' : 'none' }}>
              <Image height={20} width={20} src={loader} alt="rotate-right" /> 
            </span>
            {hasMorePages && <button className="btn" onClick={onLoadMore}><em>Load More</em></button>}
          </div>
        </div>
      }
    </>
  );
};

export default CasestudingExploreData;

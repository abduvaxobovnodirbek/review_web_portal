import React from "react";
import TrendReviewCard from "./TrendReviewCard";

const TrendReviewList = () => {
  return (
    <div>
      <h3 style={{background:'#03776f',color:'white'}} className = "p-2 font-serif font-bold">Reviews in Trend</h3>
      <TrendReviewCard/>
      <TrendReviewCard/>
      <TrendReviewCard/>
    </div>
  );
};

export default TrendReviewList;
